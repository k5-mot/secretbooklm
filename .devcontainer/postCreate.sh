#!/usr/bin/env bash

printf "\e[36mpostCreateCommand\e[0m\n"

printf "\e[34mSetup Backend environment...\e[0m\n"
pushd backend
uv sync --dev
popd

printf "\e[34mSetup Frontend environment...\e[0m\n"
pushd frontend
npm install
npm run build
npm run export
popd
