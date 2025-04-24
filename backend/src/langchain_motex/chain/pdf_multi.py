from typing import Any

from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables.base import (
    RunnableEach,
    RunnableLambda,
)

from langchain_motex.chain.base import MODEL
from langchain_motex.chain.pdf_single import CHAIN as PDF_SINGLE_PAGE_CHAIN
from langchain_motex.util.pdf_util import (
    format_texts,
    transform_pdf_to_list,
)

SYSTEM_TEMPLATE = """
次に複数ページのテキストを、以下の条件で整形してください。
- 日本語で整形すること。
- MECEの原則に従い、漏れなくダブりなく整形すること。
- 以下の出力形式に沿って、整形すること。

```出力形式
# <ドキュメントのタイトルを記載>

## 1. 概要
<概要を記載>

## 2. 内容
<内容をMarkdown形式の箇条書き("-")で記載>

## 3. まとめ
<内容のまとめと今後の展開を記載>
```
"""
HUMAN_TEMPLATE = """
```text
{text}
```
"""
SYSTEM_PROMPT = SystemMessagePromptTemplate.from_template(SYSTEM_TEMPLATE)
HUMAN_PROMPT = HumanMessagePromptTemplate.from_template(HUMAN_TEMPLATE)
PROMPT = ChatPromptTemplate.from_messages([SYSTEM_PROMPT, HUMAN_PROMPT])
PARSER = StrOutputParser()


def inputs(inputs: dict[str, str]) -> list[dict[str, Any]]:
    """Process inputs."""
    return transform_pdf_to_list(file_path=inputs["file_path"])


def outputs(outputs: list[str]) -> str:
    """Process outputs."""
    return format_texts(outputs)


CHAIN = (
    RunnableLambda(inputs)
    | RunnableEach(bound=PDF_SINGLE_PAGE_CHAIN)
    | {
        "text": RunnableLambda(outputs),
        "content": RunnableLambda(outputs) | PROMPT | MODEL | PARSER,
    }
).with_types(
    input_type=dict[str, str],
    output_type=dict[str, str],
)


if __name__ == "__main__":
    from langchain_motex.base.app_logger import get_logger
    from langchain_motex.base.settings import get_settings
    from langchain_motex.chain.pdf_multi import CHAIN as PDF_MULTI_PAGE_CHAIN

    # [DEBUG] Prepare debug env.
    settings = get_settings()
    logger = get_logger()

    # Path of a sample PDF file.
    pdf_path = "./doc/sample.pdf"

    # Get a chain.
    chain = PDF_MULTI_PAGE_CHAIN

    # Run a chain
    result = chain.invoke({"file_path": pdf_path})
    text = result["text"]
    content = result["content"]

    # Print results of a chain.
    logger.debug(text)
    logger.debug(content)
