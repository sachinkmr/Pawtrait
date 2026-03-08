
<p align="center">
  <img src="https://puppy.im/images/pawtraitlogo.png" width="100%">
</p>

<h1 align="center">Pawtrait 🐾</h1>

<p align="center">
  <b>Image Generation Extension for SillyTavern</b><br/>
  Made with paws, dreams, Redbull and a hint of chaos ✨
</p>

<p align="center">
<img src="https://img.shields.io/github/stars/ThatGirl-me/Pawtrait?style=for-the-badge&label=%E2%AD%90%20stars&color=ff9ecf">
<img src="https://img.shields.io/github/forks/ThatGirl-me/Pawtrait?style=for-the-badge&label=%F0%9F%8D%B4%20forks&color=ffb7d5">
<img src="https://img.shields.io/github/last-commit/ThatGirl-me/Pawtrait?style=for-the-badge&label=%F0%9F%93%85%20last%20commit&color=ffa6cc">
<img src="https://img.shields.io/badge/🦴%20version-v1.2.0-ff9ecf?style=for-the-badge&color=ffa6cc">


</p>

---

## 🐾 About Pawtrait

**Pawtrait** is a SillyTavern extension that blossoms your roleplay into *beautiful visuals*.

Imagine clicking a little paw, then —

✨ a dramatic scene  
✨ a soft anime portrait  
✨ a cozy character moment  

— *boom* — generated straight from your chat.

Built for storytellers, world-builders, and emotional girls with a love for visuals.  
Made with paws. Made with love. 🐾💗

---
## 🔄 Updates 
### 🆕 What's New — v1.2.0

**Phase 5: Unified Character Appearance & Persona Integration**

1. 🪄 **Unified Appearance Generation**
   - New wand button (✨) generates both **Visual Description** and **Style Preset** in a single AI call
   - Vision-capable models analyse the character's avatar; falls back to description-only when no vision support is available
   - Collapsible prompt panel lets you review and edit the exact prompt before sending

2. 👤 **Personas in Character Dropdown**
   - Your SillyTavern personas now appear alongside characters in the same dropdown, shown as `[You] Name`
   - Manage persona visuals without a separate UI section; trigger pattern row is hidden for personas automatically

3. 🔍 **Auto-Detect Active Characters**
   - New **Auto-detect** button in the Active Characters tab uses an LLM scan of recent messages to populate the active list
   - Toggle to auto-detect silently before every image generation

4. 🔭 **Vision Model Dropdown**
   - The vision model field is now a searchable dropdown auto-populated from your fetched models

---

### 🆕 What's New — v1.1.0

**Phases 1–4: Generation Controls, Gallery, Triggers & Style Presets**

1. ➕ **Negative Prompt** — Exclude unwanted elements from every generation
2. 🔒 **Configurable Seed** — Lock a seed for reproducible outputs or randomise each time
3. ✏️ **Edit Before Generate** — Optionally open the full prompt editor before any image fires
4. 🗂️ **Chat-Scoped Gallery** — Filter the gallery to images from the current chat only
5. 🤖 **Auto-Generate on Trigger** — Fire images automatically when a regex matches incoming messages; per-character override patterns supported
6. 👥 **Scene-Aware Character References** — Auto-detects named characters in recent messages and injects their avatars as reference images
7. 🧩 **Model-Aware Prompt Style** — Automatically formats prompts as tag-style or natural language based on the chosen image model
8. 🎨 **Per-Character Style Presets** — Generate comma-separated style tags from a character's avatar + description via LLM vision; injects automatically into every prompt

---
### 🆕 What’s New — v1.0.3

Pawtrait v1.0.3 brings more control, more clarity, and more prompt magic ✨


✨ New & Improved

1. 👤 Include Persona (User) Toggle
     - Added include_persona option so you can generate images without your user persona when you want pure character-focused visuals.

2. 🧠 Editable Summarizer System Prompt
     - The AI summarizer now has a fully editable system prompt template, giving you complete control over how prompts are crafted.

3. 🎯 Smarter Summarizer Model Selection
     - Summarizer models are now provider-specific

   - Shows top 5 recommended models by default

   - Includes a toggle to show all available models if you want full power-user access

   - This update makes Pawtrait more flexible for both cozy storytelling and precision prompt crafting 🐾💗



---


## ✨ Features

- 🐕 Multi-provider image generation
- 🖼️ Avatar references for character consistency
- 🧾 Optional AI summarizer to craft clean prompts
- 📚 Context depth (multi-message scenes)
- ♻️ Previous image recall for continuity
- 🗂️ Built-in gallery with chat-scoped filter
- ⌨️ Slash commands
- 🐾 One-click generate buttons under messages
- ➕ Negative prompt & configurable seed
- ✏️ Inline prompt editing before generation
- 🤖 Auto-generate on regex trigger (with per-character patterns)
- 👥 Scene-aware character reference injection
- 🧩 Model-aware prompt style (tags vs natural language)
- 🎨 Per-character AI-generated style presets
- 🪄 Unified character appearance generation (visual + style in one call)
- 👤 Persona support in the character dropdown
- 🔍 Auto-detect active characters from chat


Providers supported:
- NanoGPT
- OpenRouter
- LinkAPI.ai
- Pollinations.ai
- Custom OpenAI-compatible endpoints

---

## 📦 Installation

### Via SillyTavern

1. Open SillyTavern
2. Go to Extensions
3. Click Install Extension
4. Paste:

https://github.com/ThatGirl-me/Pawtrait

5. Reload

---

## 🚀 Quick Start

1. Open **Extensions → Pawtrait 🐾**
2. Go to **Connection**
3. Pick a **Provider**
4. Paste your **API Key**
5. Hit **Fetch Models**
6. Pick your **Model**

Then:
✨ Click 🐾 under a message  
✨ Edit prompt (optional)  
✨ Generate and enjoy 🎨

---

## ⚙️ Settings

### 🔌 Connection
- Choose Provider
- Add API Key (per provider)
- Fetch Models
- Optionally: enable AI summarizer

### 👤 Characters
- Add your **Character visual overrides**
- Add **Persona visual overrides**
- Store per-character/paw

### 🎨 Generation
- Aspect ratio
- Context message depth
- Use avatar references
- Include persona/character visuals
- Link with previous image
- Style/system prefix
- Prompt length cap


### 🖼️ Gallery
- Browse all generated images
- View fullscreen
- Delete individual or clear all


---

## 🐶 Usage

### 🐾 From Message
Click the **paw icon (🐾)** under any message to spawn new art.

Perfect for:
- Dramatic scenes  
- Intimate glances  
- Cute outfits  
- Quiet moments  
- …all the soft and chaotic feelings 💗

### ⌨️ Slash Commands

```text
/pawtrait soft pastel anime portrait, gentle lighting
/pawimg cinematic rain, neon glow, dramatic vibe
```

---

### 🔐 Privacy

- API keys stay local to SillyTavern’s settings
- Requests go only to your selected provider
- Just paws & pixels 🐾

---

## 📸 Reference Images (Heads Up!)

Not all models can accept reference images (avatars / previous art).

If you want consistency — choose a model that supports it.

Pawtrait shows support indicators so you’ll always know!


## 🩹 Troubleshooting

### No Models
- Check key
- Fetch again

### Bad Output
- Enable visuals
- Change model

---

## 💖 Contributing

PRs welcome with open paws 🐾

---

## 📜 License

MIT
Play nice. Be kind. 🐾💗

---

## ❤ Author

Made by ThatGirl / Puppy

For storytellers, dreamers, and soft girls with messy imaginations 🐾✨

“Made with paws and spite.”
