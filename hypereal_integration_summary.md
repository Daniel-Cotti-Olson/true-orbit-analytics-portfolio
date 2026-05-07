# Hypereal AI Integration with ComfyUI Summary

This document summarizes the steps and resources for integrating Hypereal AI's talking head video generation with ComfyUI.

## 1. Goal

The primary goal is to create a ComfyUI workflow that leverages Hypereal AI's API to generate talking head content, utilizing a pay-per-use model.

## 2. Decision on HTTP Interaction Node

After investigating available options and user input, the chosen tool for making HTTP API requests within ComfyUI is **`ComfyUI-RequestNodes` (version 0.0.2 recommended)**. This decision was made due to its comprehensive features for various HTTP operations and readily available documentation, aligning with the principle of focusing on documented abilities over elusive specific nodes.

## 3. Required Custom Nodes Installation

For the provided workflow to function correctly, you **must** have the following custom nodes installed in your ComfyUI environment:

*   **`ComfyUI-RequestNodes`**: Install version `0.0.2` via the ComfyUI Manager.
*   **`Comfyui-Simple-Json-Node`**: Install via the ComfyUI Manager. This node is used for parsing JSON responses from the Hypereal API.
*   **`Download File from URL`**: This is a custom Python node that needs to be manually installed. The code for this node is provided below.
*   **`ComfyUI-VideoPlayer`**: Install via the ComfyUI Manager. This node is used to display the generated video within ComfyUI.

### `Download File from URL` Custom Node Code

To install the `Download File from URL` node:

1.  **Save the code:** Save the following Python code as a file (e.g., `download_url_node.py`) inside your `ComfyUI/custom_nodes` directory. If you don't have a `custom_nodes` directory, create one.

    ```python
    import os
    import requests
    from urllib.parse import urlparse
    import logging

    # Configure logging for the custom node
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    class DownloadFileFromURL:
        """
        A ComfyUI custom node to download a file from a given URL to a specified local directory.
        """
        def __init__(self):
            pass

        @classmethod
        def INPUT_TYPES(s):
            return {
                "required": {
                    "url": ("STRING", {"multiline": False, "default": "http://example.com/file.txt"}),
                    "output_filename": ("STRING", {"multiline": False, "default": ""}),
                },
                "optional": {
                    "download_directory": ("STRING", {"multiline": False, "default": "/mnt/Phocis/User/Hot/ComfyUI_Downloads"}),
                }
            }

        RETURN_TYPES = ("STRING",)
        RETURN_NAMES = ("downloaded_filepath",)
        FUNCTION = "download_file"
        CATEGORY = "File Management"

        def download_file(self, url: str, output_filename: str, download_directory: str):
            """
            Downloads a file from the specified URL to the given directory.

            Args:
                url (str): The URL of the file to download.
                output_filename (str): The desired filename for the downloaded file.
                                       If empty, the filename will be extracted from the URL.
                download_directory (str): The local directory where the file will be saved.

            Returns:
                tuple: A tuple containing the full path to the downloaded file.
            """
            if not url:
                logging.error("URL cannot be empty.")
                return (None,)

            # Ensure the download directory exists
            os.makedirs(download_directory, exist_ok=True)
            logging.info(f"Ensured download directory exists: {download_directory}")

            # Determine the output filename
            if not output_filename:
                parsed_url = urlparse(url)
                output_filename = os.path.basename(parsed_url.path)
                if not output_filename:
                    output_filename = "downloaded_file"
                    logging.warning(f"Could not determine filename from URL, using default: {output_filename}")

            output_filepath = os.path.join(download_directory, output_filename)

            try:
                logging.info(f"Attempting to download '{url}' to '{output_filepath}'")
                with requests.get(url, stream=True) as r:
                    r.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)
                    with open(output_filepath, 'wb') as f:
                        for chunk in r.iter_content(chunk_size=8192):
                            f.write(chunk)
                logging.info(f"Successfully downloaded file to: {output_filepath}")
                return (output_filepath,)
            except requests.exceptions.RequestException as e:
                logging.error(f"Error downloading file from {url}: {e}")
                return (f"Error: {e}", 0) # Return error message and a non-standard status code for errors
            except IOError as e:
                logging.error(f"Error writing file to {output_filepath}: {e}")
                return (None,)
            except Exception as e:
                logging.error(f"An unexpected error occurred: {e}")
                return (None,)

    # ComfyUI will automatically discover nodes defined in this list
    NODE_CLASS_MAPPINGS = {
        "DownloadFileFromURL": DownloadFileFromURL
    }

    # A dictionary that contains the friendly names for the nodes
    NODE_DISPLAY_NAME_MAPPINGS = {
        "DownloadFileFromURL": "Download File from URL"
    }
    ```

2.  **Install `requests`:** If you haven't already, you'll need to install the `requests` library in your ComfyUI Python environment. You can usually do this by navigating to your ComfyUI directory in a terminal and running:
    ```bash
    pip install requests
    ```
    Or, if you are using a Conda environment, activate your ComfyUI environment first:
    ```bash
    conda activate comfyui_env # Replace comfyui_env with your actual environment name
    pip install requests
    ```
3.  **Restart ComfyUI:** Restart your ComfyUI application.
4.  **Add the node:** In the ComfyUI interface, right-click on the canvas, go to `Add Node` -> `File Management` -> `Download File from URL`.

## 4. ComfyUI Workflow (`Demon/hypereal_workflow.json`)

A ComfyUI workflow has been created to integrate with the Hypereal AI API. This workflow handles the initial request for video generation, polls for the job status, downloads the final video, and displays it.

```json
{
  "last_node_id": 16,
  "last_link_id": 20,
  "nodes": [
    {
      "id": 1,
      "type": "String",
      "pos": [
        100,
        100
      ],
      "size": {
        "0": 200,
        "1": 50
      },
      "flags": {},
      "order": 0,
      "mode": 0,
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            2
          ]
        }
      ],
      "properties": {
        "value": "YOUR_HYPEREAL_API_KEY"
      },
      "widgets_values": [
        "YOUR_HYPEREAL_API_KEY"
      ]
    },
    {
      "id": 2,
      "type": "String",
      "pos": [
        100,
        200
      ],
      "size": {
        "0": 200,
        "1": 50
      },
      "flags": {},
      "order": 1,
      "mode": 0,
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            4
          ]
        }
      ],
      "properties": {
        "value": "A person talking."
      },
      "widgets_values": [
        "A person talking."
      ]
    },
    {
      "id": 3,
      "type": "String",
      "pos": [
        100,
        300
      ],
      "size": {
        "0": 200,
        "1": 50
      },
      "flags": {},
      "order": 2,
      "mode": 0,
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            5
          ]
        }
      ],
      "properties": {
        "value": "https://example.com/your_image.png"
      },
      "widgets_values": [
        "https://example.com/your_image.png"
      ]
    },
    {
      "id": 4,
      "type": "String Replace",
      "pos": [
        400,
        200
      ],
      "size": {
        "0": 200,
        "1": 100
      },
      "flags": {},
      "order": 3,
      "mode": 0,
      "inputs": [
        {
          "name": "string",
          "type": "STRING",
          "link": 4
        },
        {
          "name": "string",
          "type": "STRING",
          "link": 5
        }
      ],
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            6
          ]
        }
      ],
      "properties": {
        "value": "{\n  \"model\": \"talking-head\",\n  \"prompt\": \"{0}\",\n  \"image_url\": \"{1}\"\n}"
      },
      "widgets_values": [
        "{\n  \"model\": \"talking-head\",\n  \"prompt\": \"{0}\",\n  \"image_url\": \"{1}\"\n}"
      ]
    },
    {
      "id": 5,
      "type": "Rest Api Node",
      "pos": [
        700,
        200
      ],
      "size": {
        "0": 200,
        "1": 150
      },
      "flags": {},
      "order": 4,
      "mode": 0,
      "inputs": [
        {
          "name": "string",
          "type": "STRING",
          "link": 2
        },
        {
          "name": "string",
          "type": "STRING",
          "link": 6
        }
      ],
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            8
          ]
        }
      ],
      "properties": {
        "url": "https://api.hypereal.tech/v1/videos/generations",
        "method": "POST",
        "headers": "{\"Authorization\": \"Bearer {0}\"}"
      },
      "widgets_values": [
        "https://api.hypereal.tech/v1/videos/generations",
        "POST",
        "{\"Authorization\": \"Bearer {0}\"}"
      ]
    },
    {
      "id": 6,
      "type": "Json Parser",
      "pos": [
        1000,
        200
      ],
      "size": {
        "0": 200,
        "1": 50
      },
      "flags": {},
      "order": 5,
      "mode": 0,
      "inputs": [
        {
          "name": "string",
          "type": "STRING",
          "link": 8
        }
      ],
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            10
          ]
        }
      ],
      "properties": {
        "path": "job_id"
      },
      "widgets_values": [
        "job_id"
      ]
    },
    {
      "id": 7,
      "type": "String Replace",
      "pos": [
        1300,
        200
      ],
      "size": {
        "0": 200,
        "1": 50
      },
      "flags": {},
      "order": 6,
      "mode": 0,
      "inputs": [
        {
          "name": "string",
          "type": "STRING",
          "link": 10
        }
      ],
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            12
          ]
        }
      ],
      "properties": {
        "value": "https://api.hypereal.tech/v1/jobs/{0}"
      },
      "widgets_values": [
        "https://api.hypereal.tech/v1/jobs/{0}"
      ]
    },
    {
      "id": 8,
      "type": "Rest Api Node",
      "pos": [
        1600,
        200
      ],
      "size": {
        "0": 200,
        "1": 150
      },
      "flags": {},
      "order": 7,
      "mode": 0,
      "inputs": [
        {
          "name": "string",
          "type": "STRING",
          "link": 12
        }
      ],
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            14
          ]
        }
      ],
      "properties": {
        "url": "{0}",
        "method": "GET",
        "headers": "{\"Authorization\": \"Bearer {0}\"}"
      },
      "widgets_values": [
        "{0}",
        "GET",
        "{\"Authorization\": \"Bearer {0}\"}"
      ]
    },
    {
      "id": 9,
      "type": "Json Parser",
      "pos": [
        1900,
        200
      ],
      "size": {
        "0": 200,
        "1": 50
      },
      "flags": {},
      "order": 8,
      "mode": 0,
      "inputs": [
        {
          "name": "string",
          "type": "STRING",
          "link": 14
        }
      ],
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            16
          ]
        }
      ],
      "properties": {
        "path": "output.video_url"
      },
      "widgets_values": [
        "output.video_url"
      ]
    },
    {
      "id": 10,
      "type": "Download File from URL",
      "pos": [
        2200,
        200
      ],
      "size": {
        "0": 200,
        "1": 50
      },
      "flags": {},
      "order": 9,
      "mode": 0,
      "inputs": [
        {
          "name": "string",
          "type": "STRING",
          "link": 16
        }
      ],
      "outputs": [
        {
          "name": "string",
          "type": "STRING",
          "links": [
            18
          ]
        }
      ],
      "properties": {},
      "widgets_values": []
    },
    {
      "id": 11,
      "type": "Video Player",
      "pos": [
        2500,
        200
      ],
      "size": {
        "0": 200,
        "1": 50
      },
      "flags": {},
      "order": 10,
      "mode": 0,
      "inputs": [
        {
          "name": "string",
          "type": "STRING",
          "link": 18
        }
      ],
      "properties": {},
      "widgets_values": []
    }
  ],
  "links": [
    [
      2,
      1,
      0,
      5,
      0,
      "STRING"
    ],
    [
      4,
      2,
      0,
      4,
      0,
      "STRING"
    ],
    [
      5,
      3,
      0,
      4,
      1,
      "STRING"
    ],
    [
      6,
      4,
      0,
      5,
      1,
      "STRING"
    ],
    [
      8,
      5,
      0,
      6,
      0,
      "STRING"
    ],
    [
      10,
      6,
      0,
      7,
      0,
      "STRING"
    ],
    [
      12,
      7,
      0,
      8,
      0,
      "STRING"
    ],
    [
      14,
      8,
      0,
      9,
      0,
      "STRING"
    ],
    [
      16,
      9,
      0,
      10,
      0,
      "STRING"
    ],
    [
      18,
      10,
      0,
      11,
      0,
      "STRING"
    ]
  ],
  "groups": [],
  "config": {},
  "extra": {},
  "version": 0.4
}
```

## 5. Instructions for Using the Workflow

1.  **Install Custom Nodes:** Ensure you have installed all the required custom nodes as listed in Section 3.
2.  **Save the workflow:** Save the JSON content provided in Section 4 as a file named `hypereal_workflow.json` in your `Demon` directory.
3.  **Load the workflow:** In ComfyUI, click the "Load" button and select the `Demon/hypereal_workflow.json` file.
4.  **Enter your API key:** In the workflow, locate the "String" node (ID 1, positioned at 100, 100) which has its `value` set to "YOUR_HYPEREAL_API_KEY". Replace this text with your actual Hypereal AI API key.
5.  **Provide input:** The workflow has two other "String" nodes (IDs 2 and 3) for input:
    *   Node ID 2: For the text prompt that describes the talking head's speech.
    *   Node ID 3: For the URL of the image that will be used for the talking head.
    Adjust these values as needed.
6.  **Run the workflow:** Click the "Queue Prompt" button in ComfyUI to execute the workflow.

## 6. Important Notes

*   **Starting Point:** This workflow is a foundational example. You may need to customize API parameters and the workflow structure to align with specific Hypereal AI features or your advanced requirements. The current polling mechanism is basic and may need enhancements for more robust production use.
*   **Error Handling:** While some basic error handling is incorporated, consider adding more comprehensive logging and user feedback mechanisms for a production environment.
*   **API Key Security:** Always handle your API key securely. Avoid embedding it directly into shared workflows or committing it to version control systems.
