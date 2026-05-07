import fitz  # PyMuPDF

def create_pdf_preview(pdf_path, output_image_path):
    """
    Creates a PNG preview of the first page of a PDF.
    """
    try:
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)  # Load the first page
        pix = page.get_pixmap(dpi=150)  # Render at 150 DPI
        pix.save(output_image_path)
        print(f"Successfully created preview image: {output_image_path}")
    except Exception as e:
        print(f"Error creating PDF preview: {e}")
    finally:
        if 'doc' in locals():
            doc.close()

if __name__ == "__main__":
    create_pdf_preview("Sales_Analysis_Report.pdf", "Sales_Analysis_Report.png")
