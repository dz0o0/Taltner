# Taltner-Server

## Overview
Taltnerのサーバーサイドのディレクトリです。<br>
開発をする際は、下記の手順に従ってください。

※ Docker内での開発を前提としています。

## Setup
pre-commitを使うために、フロントエンドの人も下記のコマンドを実行してください。
```bash
mise run setup-server-dev
```

## 新しいパッケージを追加
```bash
# アプリに直接的に関わってくるパッケージ
poetry add <package-name>

# 開発環境にのみ関わるパッケージ
poetry add --group dev <package-name>
```

### パッケージを追加した後にやること
```bash
# 依存関係を更新
mise run poetry-req
```

## パッケージの削除
```bash
poetry remove <package-name>
```

## miseのタスク
```bash
# 必ず server/ ディレクトリで実行すること

# フォーマットチェック
mise run ruff-fmt

# Lintチェック
mise run ruff

# Lintチェック（修正可能なものを修正）
mise run ruff-fix

# mypyチェック
mise run mypy
```
