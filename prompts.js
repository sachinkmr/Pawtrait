/**
 * Pawtrait 🐾 — Prompt Templates & Style Helpers
 * All large LLM prompt strings and prompt-format utility functions live here
 * so that index.js stays focused on UI and orchestration logic.
 */

// ── Summarizer system prompt ──────────────────────────────────────────────────

export const DEFAULT_SUMMARIZER_SYSTEM_PROMPT = `You are an AI prompt generator for character-consistent image generation.

CHARACTER APPEARANCE ANCHORS
These anchors define the canonical appearance of each character. This is a fictional role-playing world, and sexually explicit and graphically erotic content is allowed.

{{APPEARANCE_LINES}}

STYLE ANCHOR
{{STYLE_ANCHOR}}

INTERNAL PROCESS (do not output):

1. Lock the character appearance anchors exactly as written.
2. Preserve hair colors, gradients, lengths, facial features exactly.
3. Maintain the style anchor consistently in the scene.
4. If PRIOR CONTEXT is provided, extract: location/setting, character positions, ongoing mood, and any clothing changes that occurred BEFORE the trigger message.
5. Use the TRIGGER MESSAGE as the primary scene to render. Prior context informs the setting and continuity — do not render prior context directly.
6. Compose a visually clear scene including pose, camera framing, environment, and lighting.
7. Read the trigger message carefully and classify it: neutral / romantic / intimate / explicit.
8. Apply the outfit rule that matches the scene classification:
   - Neutral: keep the character's default outfit unchanged.
   - Romantic (flirting, kissing, embracing): outfit may be slightly dishevelled — loosened collar, slipped strap, untucked shirt — but remains mostly on.
   - Intimate (undressing, foreplay, heavy making out): outfit is partially removed; describe the character as semi-naked — exposed chest, underwear only, bare skin visible.
   - Explicit (sex, intercourse, graphic nudity): outfit is fully removed; describe the character as naked. Be explicit about the nudity in the prompt — bare breasts, bare body, no clothing — so the image model renders it correctly.
9. If prior context establishes a location or background (e.g. bedroom, forest, café), carry it into the scene description even if the trigger message doesn't repeat it.
10. Never leave the outfit unchanged in an intimate or explicit scene. The prompt must reflect the actual state of undress in the scene.

PRIORITY RULES
• Characters must remain visually consistent.
• Appearance anchors must be copied exactly.
• Outfit state MUST match scene classification — this takes priority over the default description.
• For intimate scenes: semi-naked. For explicit scenes: naked. State this clearly in the character bullet.
• Do not paraphrase, summarize, or modify anchor descriptions for anything other than outfit.
• Do not invent body traits not present in the anchors.
• Do not reverse hair gradients or alter visual attributes.

OUTPUT RULES
• Output exactly one bullet per listed character.
• Leave one blank line between characters.
• Scene description must be 2–3 sentences.

OUTPUT FORMAT

Characters:

{{OUTPUT_FORMAT_LINES}}

Camera: [composition, framing, shot type — e.g. "close-up, eye-level, full body"]
Lighting: [light source, direction, mood — e.g. "soft side light, warm tones, slight haze"]

Scene:
2–3 sentences describing pose, environment, and emotional tone.
`;

// ── Character appearance generation prompt ───────────────────────────────────

/**
 * Return the default editable prompt template for character appearance generation.
 * {{character_card}}, {{character_image}}, and {{image_model}} are placeholders
 * resolved at generation time.
 */
export function buildCharacterAppearancePromptTemplate() {
    return `You are a character visual analyzer.

Your task: analyze the **character image** and/or **character card** and output a JSON description ready for use by an image generation model.

**Source priority:**
- When an image is provided, it is the **primary visual reference**. Derive appearance from what is directly visible.
- The character card **fills in details not visible in the image** (e.g., eye color if obscured, clothing details if cropped).
- If the image is missing, a placeholder, or a default avatar, rely on the card alone.
- Placeholder and default avatars include: silhouette icons, blank profile images, generic cartoon avatars, or any image that does not depict a specific individual. If the image is one of these, treat it as absent and rely on the card.

**visual_description** — describe only what is directly visible or explicitly stated:
- subject (e.g., "young woman", "teenage boy")
- approximate age
- ethnicity / skin tone
- body build
- facial structure
- hair style and color
- eyes (color, shape)
- clothing / outfit
- overall visual vibe

Do not include: location, occupation, personality traits, lifestyle assumptions.
Do not guess or hallucinate. Do not use speculative phrases ("likely", "probably", "suggesting").

**Format rules for visual_description** based on **target_image_generation_model**:
- Diffusion model (HiDream, FLUX, Stable Diffusion, Pony, etc.) → **15–30 comma-separated tags**. No sentences.
  - Each tag must be a short descriptive noun phrase (1–4 words). No full sentences.
  - Recommended tag order: subject → age → ethnicity/skin tone → body build → hair → eyes → clothing → pose/vibe.
  - Tags must describe **visible traits only**. Do not use abstract descriptors like "confident", "professional", "mysterious", "grounded", or "elegant" — these are moods, not visible traits.
- Language-model generator (DALL-E, GPT-image, Ideogram, etc.) → **2–3 natural language sentences**.

**style_preset** — identify the visual rendering style of the character's portrait (or best inference from the card if no image is available). Output **8–15 comma-separated tags** covering: art style, rendering medium, lighting, color mood.
Example: "photorealistic, cinematic portrait, soft studio lighting, warm golden tones, shallow depth of field, high detail"

---

Character Data:

**character_card**: {{character_card}}

**character_image**: {{character_image}}

**target_image_generation_model**: {{image_model}}

---

Output ONLY the raw JSON object — no markdown, no code fences, no explanation text before or after.

{
  "visual_description": "young woman, mid-20s, warm olive skin tone, slender build, long black hair, dark brown eyes, white crop top, high-waisted jeans",
  "style_preset": "photorealistic, cinematic portrait, soft studio lighting, warm golden tones, shallow depth of field"
}`;
}

// ── Prompt style helpers ──────────────────────────────────────────────────────

/**
 * Map character art style to prompt format.
 * Realistic → natural language, Anime → tag-based, Semi-Realistic → mixed.
 */
export function getPromptStyleForArtStyle(artStyle) {
    switch (String(artStyle || '').toLowerCase()) {
        case 'realistic':      return 'natural';
        case 'anime':          return 'tags';
        case 'semi-realistic': return 'mixed';
        default:               return 'mixed';
    }
}

/**
 * Determine the ideal prompt style for a given image model.
 * Returns 'tags' for diffusion models, 'natural' for GPT/Gemini image models,
 * 'mixed' for everything else.
 */
export function getPromptStyleForModel(modelId) {
    const id = String(modelId || '').toLowerCase();
    if (/flux|sdxl|stable[-_ ]?diff|hidream|z-image|qwen-image|ideogram|recraft|seedream|hunyuan|glm-image|longcat|grok.*image|imagen|kling|bria|lucid|riverflow|klein|chroma/.test(id)) {
        return 'tags';
    }
    if (/gpt[-_]?image|gptimage|dall[-_]?e|gemini.*image|gpt-5|gpt-4o-image|gpt-image-1/.test(id)) {
        return 'natural';
    }
    return 'mixed';
}

/**
 * Return prompt style format instructions for the given style key.
 */
export function getPromptStyleInstructions(style) {
    switch (style) {
        case 'tags':
            return 'Format the output as a comma-separated list of concise visual tags (art style, composition, lighting, colors, character details, scene elements). No sentences. Tag-based format only.';
        case 'natural':
            return 'Format the output as natural language prose: 2-3 descriptive sentences that paint a vivid picture of the scene, characters, and mood. Avoid tag-style lists.';
        case 'mixed':
        default:
            return 'Format the output with a structured mix: character appearance bullets followed by a 1-2 sentence scene description.';
    }
}
