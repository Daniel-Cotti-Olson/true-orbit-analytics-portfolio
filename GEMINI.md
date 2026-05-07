# Directory Overview

This directory is the primary workspace for **True Orbit Analytics**, an elite data intelligence and strategic reporting service. It also continues to serve as a generative AI environment (ComfyUI) for high-quality production.

## Projects

### True Orbit Analytics
*   **Tech Stack:** Next.js (TypeScript), Tailwind CSS, Framer Motion.
*   **Design System:** Indigo and Gold aesthetic.
    *   **Background:** Indigo radial gradient (`#1e1b4b` to `#0f0c29`).
    *   **Logo Banner:** Deep Indigo (`#1e1b4b`) centered banner.
    *   **Headlines:** Full gold-gradient text.
*   **Service Focus:** Data Intelligence & Strategic Reporting.
*   **Hosting:** GitHub repository (`true-orbit-analytics-portfolio`) pushed to the `master` branch, prepared for Cloudflare Pages deployment.

### Generative AI & ComfyUI
The primary tool for production, chosen for its modularity and power.

## Key Files
...

*   `.gitignore`: This file is configured to exclude `aider`'s cache and history files from the Git repository.
*   `.aider.chat.history.md`: Contains a detailed log of the user's previous conversations with the `aider` assistant. This log documents the initial project goals, system analysis, and setup steps taken so far.
*   `.aider.input.history`: A log of the user's inputs to the `aider` assistant.

## Usage

This directory serves as the main workspace for the generative AI project. The initial setup has been partially completed, including:

*   Installation of Miniconda.
*   System updates and installation of essential packages like `git` and `python3-venv`.
*   Installation of NVIDIA drivers and the CUDA toolkit.

The user has specified a clear storage strategy to optimize for both fast application performance and large file storage:
*   **SSD Storage**: The primary solid-state drive (SSD) is used for the operating system, application binaries (like ComfyUI), and libraries. These are files that benefit from high-speed access and do not grow significantly over time.
*   **HDD Storage (`/mnt/Phocis/User/Hot`)**: This directory, located on a large hard disk drive (HDD), is the designated workspace for all heavy and growing files. This includes AI models, datasets, and all generated outputs (images, videos, etc.).
*   **Symlink Integration**: To connect the two, symbolic links (symlinks) are used. This allows the applications running from the fast SSD (the "heads") to access and use the large data files stored on the HDD (the "bodies") seamlessly.

The next steps for this project involve continuing the setup of ComfyUI, downloading and organizing generative AI models, and configuring the environment according to the user's goals.

## System Maintenance & Known Issues

### CUDA Initialization Error
*   **Date:** Wednesday, March 25, 2026
*   **Issue:** `RuntimeError: CUDA unknown error` or `CUDA initialization: CUDA unknown error` upon starting ComfyUI. This often occurs when the NVIDIA driver and the running kernel become out of sync, sometimes after system updates or large data downloads.
*   **Fix:** A full system restart (**Reboot**) is required to reload the NVIDIA kernel modules and re-initialize the GPU state.
*   **Note:** Do not update the kernel manually as it has caused severe boot issues (splash screen hangs) in the past. If the system fails to boot after a kernel update, roll back to a known-good kernel via the GRUB menu.

