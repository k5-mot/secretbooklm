from abc import ABCMeta, abstractmethod

from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.runnables.base import Runnable
from langchain_google_genai import ChatGoogleGenerativeAI

MODEL = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
)


class BaseChainGenerator(metaclass=ABCMeta):
    model: BaseChatModel = MODEL
    chain: Runnable

    def __init__(self) -> None:
        """Constructor."""
        self.initialize()

    @abstractmethod
    def initialize(
        self,
    ) -> None:
        """Initialize chain."""

    def get_chain(self) -> Runnable:
        """Get chain."""
        return self.chain
