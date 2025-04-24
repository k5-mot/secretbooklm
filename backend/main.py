import datetime
import os
from pathlib import Path
from typing import Annotated

import aiofiles
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import File

from langchain_motex.base import get_logger, get_settings
from langchain_motex.chain import PDF_MULTI_PAGE_CHAIN

settings = get_settings()
logger = get_logger()

app = FastAPI(
    title="LangChain Server",
    version="1.0",
    description="LangchainのRunnableインターフェースを使ったシンプルなAPIサーバー",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.post("/")
async def post(file: Annotated[UploadFile, File(...)]) -> str:
    """PDF."""
    # Validate file name.
    if file.filename is None:
        error_message = "Valid filename."
        raise ValueError(error_message)
    file_path = Path("./doc/tmp") / file.filename

    # Fetch uploaded file.
    pdf_file = await file.read()

    # Save temporary
    async with aiofiles.open(file_path, mode="wb") as f:
        await f.write(pdf_file)

    # Get a chain.
    chain = PDF_MULTI_PAGE_CHAIN

    # Run a chain
    result = chain.invoke({"file_path": str(file_path)})
    text = result["text"]
    content = result["content"]

    # Print results of a chain.
    logger.debug(text)
    logger.debug(content)

    # Logging inputs & outputs.
    now = datetime.datetime.now(
        datetime.timezone(
            datetime.timedelta(hours=9),
        ),
    )
    timestamp = now.strftime("%Y%m%d%H%M%S")
    async with aiofiles.open(f"./log/input.{timestamp}.log", mode="w") as f:
        await f.write(text)
    async with aiofiles.open(f"./log/output.{timestamp}.log", mode="w") as f:
        await f.write(content)

    return f"{content}"


if __name__ == "__main__":
    import uvicorn

    FASTAPI_HOST = os.getenv("FASTAPI_HOST", "localhost")
    FASTAPI_PORT = int(os.getenv("FASTAPI_PORT", "8000"))
    uvicorn.run(app, host="FASTAPI_HOST", port=FASTAPI_PORT)
