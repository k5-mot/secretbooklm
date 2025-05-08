FROM mcr.microsoft.com/devcontainers/base:bookworm

# Install required packages via apt.
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get autoremove -y \
    && apt-get install -y --no-install-recommends curl ca-certificates gnupg \
    && apt-get install -y --no-install-recommends vim poppler-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER vscode
ENV PATH="/home/vscode/.volta/bin:${PATH}"
ENV PATH="/home/vscode/.local/bin:${PATH}"

# Setup uv (Python).
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
RUN uv python install 3.12

# Setup volta (Node.js).
RUN curl https://get.volta.sh | bash
RUN volta install node@22
RUN npm install -g npm git-cz
RUN npm install -g @biomejs/biome
