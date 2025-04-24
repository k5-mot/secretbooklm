from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Settings for the application."""

    UV_LINK_MODE: str = Field(default="copy")

    ## OPTIONAL:
    LOG_LEVEL: str = Field(default="INFO")
    LOG_FILEPATH: str = Field(default="./log/app.log")
    FASTAPI_HOST: str = Field(default="127.0.0.1")
    FASTAPI_PORT: int = Field(default=8000)
    OLLAMA_API_URL: str = Field(default="")
    AZURE_OPENAI_API_KEY: str = Field(default="")
    AZURE_OPENAI_ENDPOINT: str = Field(default="")
    AZURE_OPENAI_DEPLOYMENT: str = Field(default="")
    GOOGLE_API_KEY: str = Field(default="")

    class Config:
        """Configuration for the settings."""

        env_file = ".env"
        case_sensitive = True


def get_settings() -> Settings:
    """Get the settings for the application."""
    return Settings()


if __name__ == "__main__":
    import json

    from langchain_motex.base.app_logger import get_logger

    settings = get_settings()
    logger = get_logger()
    logger.debug(json.dumps(settings.model_dump(), indent=2))
