from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain_core.prompts.chat import _ImageTemplateParam
from langchain_core.runnables import RunnableLambda

from langchain_motex.chain.base import MODEL
from langchain_motex.util.pdf_util import (
    extract_image_from_pdfpage,
    extract_text_from_pdfpage,
)

SYSTEM_TEMPLATE = """
次に示す画像とテキストを、以下の条件で説明してください。
- 説明はMarkdownのリスト形式("-")で行うこと。
- 説明はMarkdownの強調("**text**")を使用しないこと。
- 日本語で説明すること。
- MECEの原則に従い、漏れなくダブりなく説明すること。
"""

HUMAN_TEMPLATE = """
```text
{text}
```
"""

IMAGE_TEMPLATE: _ImageTemplateParam = {
    "image_url": {
        "url": "data:image/png;base64,{image}",
    },
}

SYSTEM_PROMPT = SystemMessagePromptTemplate.from_template(SYSTEM_TEMPLATE)
HUMAN_PROMPT = HumanMessagePromptTemplate.from_template(
    [
        HUMAN_TEMPLATE,
        IMAGE_TEMPLATE,
    ],
)
PROMPT = ChatPromptTemplate.from_messages(
    [
        SYSTEM_PROMPT,
        HUMAN_PROMPT,
    ],
)
PARSER = StrOutputParser()


def inputs_text(inputs: dict[str, str]) -> str:
    """Process inputs."""
    return extract_text_from_pdfpage(
        str(inputs["file_path"]),
        int(inputs["page_num"]),
    )


def inputs_image(inputs: dict[str, str]) -> str:
    """Process inputs."""
    return extract_image_from_pdfpage(
        str(inputs["file_path"]),
        int(inputs["page_num"]),
    )


CHAIN = (
    {
        "text": RunnableLambda(inputs_text),
        "image": RunnableLambda(inputs_image),
    }
    | PROMPT
    | MODEL
    | PARSER
).with_types(
    input_type=dict[str, str],
    output_type=str,
)


if __name__ == "__main__":
    from langchain_motex.base.app_logger import get_logger
    from langchain_motex.base.settings import get_settings
    from langchain_motex.chain.pdf_single import (
        CHAIN as PDF_SINGLE_PAGE_CHAIN,
    )

    # [DEBUG] Prepare debug env.
    settings = get_settings()
    logger = get_logger()

    # Path of a sample PDF file.
    pdf_path = "./doc/sample.pdf"

    # Get a chain.
    chain = PDF_SINGLE_PAGE_CHAIN

    # Run a chain
    result = chain.invoke({"file_path": pdf_path, "page_num": f"{1}"})

    # Print results of a chain.
    logger.debug(result)
