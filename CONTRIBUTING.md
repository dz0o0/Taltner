**このガイドラインは現在工事中です。**


# Contributing Guide

## はじめに
このドキュメントは、プロジェクトの開発ガイドラインを提供することを目的としています。<br>
チームメンバー全員が効率的かつ一貫した方法で作業できるよう、以下のポリシーに従ってください。

## 機能の追加やバグの修正
新しい機能の提案やバグの報告は、Issuesを通じて行います。新しいIssueは、[Issue Form](工事中)から作成してください。

## コミットの書き方
コミットメッセージは、[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)の規約に従います。形式は以下の通りです：
```md
<type>(optional <scope>): <description>

[optional <body>]

[optional <footer(s)>]
```
`type`は変更の種類を示し、以下のものを指定する必要があります：
- `feat`: 新しい機能
- `update`: バグ以外の修正
- `fix`: バグの修正
- `docs`: ドキュメント関連
- `ci`: CI/CD設定
- `refactor`: 仕様に影響がないコード改善（リファクタリング）
- `chore`: ビルド、補助ツール、ライブラリ関連

その他説明:
- `scope`は変更が影響を与える範囲です。（オプション）
- `description`は変更内容を簡潔に説明します。
- `body`は変更内容の詳細を記述します。（オプション）
- `footer`は関連するIssue番号や、破壊的変更がある場合に記述します。（オプション）

### 例:
```md
feat(login): ユーザーログイン機能を追加

ログインAPIを実装し、セキュリティを強化しました。具体的には〜〜

BREAKING CHANGE: 新しい認証フローを導入したため、古い認証メソッドは削除されます。
```

## 開発環境
このプロジェクトでは、`Python 3.10.14`と`Node.js 21.7.3`を使用しています。<br>
また、ランタイムのバージョン管理には`mise`, 言語のパッケージ管理には`Poetry`と`npm`を使用しています。

開発環境はすべてDockerで構築されています。開発には、Docker上で作業してください。

外部エディタとしてVSCode(Cursor)を使用する場合、`Dev Container`拡張機能の使用を推奨します。


### 開発環境の構築
工事中

## READMEについて
トップレベルのREADME.mdは、プロジェクトの概要や使い方を記述しています。

また、`client/`, `server/`などのサブディレクトリにはそのディレクトリ内のファイル構成や使い方に関するREADME.mdを配置します。

## miseのタスク設定
miseでは、`mise run <task name>`で実行できるタスク(コマンド)を設定できます。<br>
コマンドを短縮したり、複数のコマンドをまとめたりすることができます。

現在設定しているタスクは、全て`/.mise.toml`に記述されています。<br>
タスクの追加は大歓迎ですが、既存のタスクの変更を行う場合は、事前に`Issue`を立ててください。

### 記述方法:

```toml
# miseで実行するタスクの設定

[tasks.<task name>]  # コマンド名
description = ""  # 説明
run = "<command>"  # 実行したいコマンド
```
### 例:
`mise run hello`コマンドで`echo Hello World`と`touch hello.txt`を実行するタスク
```toml
# mise run hello
[tasks.hello]
description = "Hello World"
run = "echo Hello World && touch hello.txt"
```

