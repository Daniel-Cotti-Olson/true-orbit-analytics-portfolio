# Module 5: Product Deep Dive: Apparel, Mugs & Hats

This module translates your raw design files into professional, production-ready assets for some of the most popular print-on-demand products. We'll cover the technical preparation, the artistic placement, and the specific requirements for apparel, mugs, and hats.

---

## 1. The Professional Print-Ready File Checklist

Before you even think about uploading a design, it must meet professional standards. A failure here results in poor quality prints and unhappy customers.

Your goal is to create a **high-resolution PNG with a transparent background.**

*   **[ ] File Format: PNG:** This is non-negotiable. PNG is the only common format that supports high-quality transparency.
*   **[ ] Resolution: 300 DPI:** This is the industry standard for printing. DPI stands for "Dots Per Inch." While our AI-generated images start at a screen resolution (like 96 DPI), their large pixel dimensions (`2048x3072`, etc.) mean they are already high-resolution. When you upload to a POD service, their software will correctly interpret it as 300 DPI.
*   **[ ] Color Profile: sRGB:** This is the standard for digital images and what POD printers expect. ComfyUI and other AI tools already generate in sRGB, so you typically don't need to change anything.
*   **[ ] Transparency: Enabled:** The background of your design MUST be transparent, not white. This is the most critical step.

---

## 2. Creating the Production File: A Step-by-Step Guide

This section will guide you through creating a production-ready file using free, powerful online tools.

### Step 1: Remove the Background

AI models do not generate true transparency. A white background in your file will be printed as a big white box on your product.

*   **Recommended Tool:** **Adobe Express Free Background Remover** (`https://www.adobe.com/express/feature/image/remove-background`)
*   **Process:**
    1.  Navigate to the Adobe Express website.
    2.  Drag and drop your raw image file from ComfyUI.
    3.  The tool's AI will automatically detect and remove the background.
    4.  Download the resulting PNG file. It will now have a proper transparent background.

### Step 2: Create Color Variations

Your design's color needs to contrast with the product color. A black design will be invisible on a black t-shirt. You must create both a dark and a light version of each design.

*   **Recommended Tool:** **Photopea Online Photo Editor** (`https://www.photopea.com`)
*   **Process to Create a White Version:**
    1.  Navigate to `Photopea.com`.
    2.  Drag and drop the **transparent PNG** you created in Step 1.
    3.  In the **Layers panel** on the right, **double-click** the layer containing your design to open the "Layer Style" window.
    4.  Check the box for **"Color Overlay"**.
    5.  Click the color box (it defaults to red) and select pure white from the color picker. Click "OK".
    6.  Click the main "OK" button to confirm.
    7.  Go to **File > Export as > PNG**. Click **"Save"**.

You now have two essential assets: `design_black.png` for light products and `design_white.png` for dark products.

---

## 3. Design Placement Psychology

Where you place a design is as important as the design itself. The placement communicates a message.

*   **Center Chest (The Billboard):** Large, bold, and confident. This is for your "Hero" designs. It's a statement piece that screams "Look at me!"
*   **Left Chest (The Badge):** Small, subtle, and classic. This placement feels more like a premium brand logo. It's perfect for your "Secondary" designs and creates a more understated, stylish product.
*   **Wraparound (The Panorama):** Specific to mugs, this creates an immersive experience. It's ideal for patterns or landscape-style hero designs.
*   **Front Panel (The Logo):** For hats, this is your only option. Designs must be simple, bold, and instantly recognizable. Complex details will be lost. This is the prime location for your best "Secondary" logo-style designs.

When creating a product listing, consider offering both a Center Chest and a Left Chest version of the same shirt. They appeal to different types of buyers.

---

## 4. Using POD Templates

Your POD provider (Printify, Printful) will provide templates for every product. **Use them.** Drag your prepared PNG file onto their template. They will show you the exact print area and warn you if your image resolution is too low. This is your final quality check before making a product live.
