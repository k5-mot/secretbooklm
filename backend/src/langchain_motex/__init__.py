def main() -> None:
    """Main."""
    from langchain_motex.base.app_logger import get_logger

    logger = get_logger()
    logger.debug("Hello from langchain-motex!")


if __name__ == "__main__":
    main()
