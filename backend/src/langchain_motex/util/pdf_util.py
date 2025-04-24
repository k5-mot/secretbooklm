import base64
from io import BytesIO
from pathlib import Path
from typing import Any

import pypdf
from pdf2image import convert_from_path
from PIL import Image


def transform_pdf_to_list(file_path: str) -> list[dict[str, Any]]:
    """Transform a PDF file to a page list."""
    reader = pypdf.PdfReader(file_path)
    total_pages = len(reader.pages)
    return [
        {"file_path": file_path, "page_num": page_num}
        for page_num in range(1, total_pages + 1)
    ]


def encode_pil_with_base64(image: Image.Image, fmt: str = "PNG") -> str:
    """Encode a PIL image using base64."""
    buf = BytesIO()
    image.save(fp=buf, format=fmt)
    return base64.b64encode(buf.getvalue()).decode("utf-8")


def extract_text_from_pdfpage(file_path: str, page_num: int) -> str:
    """Extract text from a single page of PDF."""
    with Path(file_path).open("rb") as file:
        reader = pypdf.PdfReader(file)
        page = reader.pages[page_num - 1]
        return page.extract_text()


def extract_image_from_pdfpage(file_path: str, page_num: int) -> str:
    """Extract image from a single page of PDF."""
    images = convert_from_path(
        pdf_path=file_path,
        first_page=page_num,
        last_page=page_num + 1,
    )
    return encode_pil_with_base64(images[0])


def format_texts(texts: list[str]) -> str:
    """Format multiple texts into a single text."""
    content = ""
    for page_num, text in enumerate(texts):
        content += f"## Page {page_num}\n"
        content += f"{text}\n\n"
    return content
