# Channel Banner Instructions for "They Move in Darkness"

Here are the assets and instructions to create your channel banner.

## 1. Generate the Background Image

Use the following prompt in ComfyUI (or another image generator) to create the atmospheric background.

**Recommended Dimensions:** 2560x1440 pixels

**ComfyUI Prompt:**
```json
{
  "3": {
    "class_type": "KSampler",
    "inputs": {
      "seed": 1234567890,
      "steps": 25,
      "cfg": 8,
      "sampler_name": "dpmpp_2m_sde",
      "scheduler": "karras",
      "denoise": 1,
      "model": ["4", 0],
      "positive": ["6", 0],
      "negative": ["7", 0],
      "latent_image": ["5", 0]
    }
  },
  "4": {
    "class_type": "CheckpointLoaderSimple",
    "inputs": {
      "ckpt_name": "sd_xl_base_1.0.safetensors"
    }
  },
  "5": {
    "class_type": "EmptyLatentImage",
    "inputs": {
      "width": 2560,
      "height": 1440,
      "batch_size": 1
    }
  },
  "6": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "masterpiece, best quality, abstract background, minimalist horror, atmospheric, deep dark blues and charcoal grays, subtle shifting shadows, indistinct shapes in the gloom, oppressive unsettling atmosphere, faint texture, cinematic",
      "clip": ["4", 1]
    }
  },
  "7": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "text, words, bright colors, saturated, person, face, amateur, ugly, deformed",
      "clip": ["4", 1]
    }
  },
  "8": {
    "class_type": "VAEDecode",
    "inputs": {
      "samples": ["3", 0],
      "vae": ["4", 2]
    }
  },
  "9": {
    "class_type": "SaveImage",
    "inputs": {
      "filename_prefix": "ChannelBannerBackground",
      "images": ["8", 0]
    }
  }
}
```

## 2. Assemble the Banner

1.  Open the generated background image in a simple graphics editor (like GIMP, Photoshop, or even Canva).
2.  Add the channel name **"They Move in Darkness"** in the center "safe area".
    *   **Safe Area:** For a 2560x1440 image, the central safe area that is visible on all devices is approximately **1546x423 pixels**. Place your text within this central box.
    *   **Font Suggestion:** Use a clean, slightly unsettling font. Good free options on Google Fonts are **"Anonymous Pro,"** **"Special Elite,"** or **"Cutive Mono."** Make the text white or a very light gray.
3.  (Optional) You can place the `profile_logo.svg` symbol subtly in the background, with low opacity, as a watermark.

This will give you a professional, atmospheric banner that matches your new logo.
