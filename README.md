# SecretbookLM

## 概要

Google NotebookLM のローカルホスト版です。

## 技術スタック

- フロントエンド
  - React.js
  - Vite
  - MUI
  - Prettier
  - ESLint
- バックエンド
  - Python
  - uv
  - FastAPI
  - LangChain
  - Mangum
  - Pandoc
- インフラ(AWS)
  - フロントエンド
    - S3
    - CloudFront
  - バックエンド
    - ECR (Docker イメージ)
    - Lambda (Docker)
    - API Gateway
  - 認証
    - Cognito
  - ファイル管理
    - S3
  - プロジェクト管理
    - DynamoDB
  - IaC
    - AWS CDK
- インフラ(ローカル)
  - フロントエンド
    - Docker
  - バックエンド
    - Docker
  - 認証
    - Magnito
  - ファイル管理
    - Minio
  - プロジェクト管理
    - DynamoDB local
- 開発環境
  - devcontainer
  - Docker-Compose
