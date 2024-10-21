# Taltner

- [Installation](#installation)
  - [Mac](#mac)
    - [1. poetryのインストール](#1-poetryのインストール)
    - [2. miseのインストール](#2-miseのインストール)
      - [2.1 miseで環境のセットアップ](#21-miseで環境のセットアップ)
    - [3. ffmpegのインストール](#3-ffmpegのインストール)
  - [Windows](#windows)
    - [1. pyenv-winのインストール](#1-pyenv-winのインストール)
      - [1.1. pyenv-winでセットアップ](#11-pyenv-winでセットアップ)
    - [2. voltaのインストール](#2-voltaのインストール)
      - [2.1. voltaで環境のセットアップ](#21-voltaで環境のセットアップ)
    - [3. ffmpegのインストール](#3-ffmpegのインストール-1)
- [Usage](#usage)
  - [server](#server)
  - [client](#client)


## Installation

※ Dockerを利用すると、リソース不足に陥ってモデルの推論ができない可能性があるので、ローカルでの実行を推奨します。

### Mac

インストール系は、Homebrewを利用して行います。

もし、Homebrewがインストールされていない場合は、下記コマンドを実行してください。

```bash
# Homebrewのインストール
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# PATHを通す
echo 'export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"' >> ~/.zshrc

# shellの再起動
exec $SHELL -l
```

#### 1. poetryのインストール

Pythonのパッケージ管理ツール

```bash
brew install poetry='1.8.3'
```

#### 2. miseのインストール

ランタイムバージョン管理ツール

今回は`Python`と`Node`をインストールします。

```bash
# miseのインストール
brew install mise

# PATHを通す
echo 'export PATH=~/.local/bin:$PATH' >> ~/.zshrc
# shell起動時にmiseを有効化
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc

# shellの再起動
exec $SHELL -l
```

##### 2.1 miseで環境のセットアップ

パッケージのインストールなどを一気に行います。

※ 必ず、`Taltner`ディレクトリで実行してください。

```bash
mise run setup
```

#### 3. ffmpegのインストール

Whisperを動かすための依存関係として、ffmpegをインストールします。

```bash
brew install ffmpeg
```

### Windows

Windowsの場合は`mise`がないので、`pyenv-win`と`volta`を利用して環境を構築します。

実行時は、`PowerShell 7`を利用してください。

※ 他のバージョン管理ツールを利用している場合は、そのツールを利用しても構いません。

- `Python`: `3.10.11`
- `Node`: `21.7.3`

#### 1. pyenv-winのインストール

```bash
# pyenv-winのインストール
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"

# PowerShellの再起動
```

もし上記でエラーが出た場合は、`PowerShell`を管理者権限で開き、下記を実行してください。

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

その後、再度インストールを行ってください。

##### 1.1. pyenv-winでセットアップ

※ 必ず、`Taltner/server`ディレクトリで実行してください。

```bash
# Pythonのインストール
pyenv install 3.10.11
pyenv local 3.10.11

# poetryのインストール
pip install poetry='1.8.3'

# poetryでパッケージのインストール
poetry install --without dev
```

#### 2. voltaのインストール

下記サイトを参考に、開発者モードを有効化してください。

[デバイスを開発用に有効にする - Windows apps | Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/apps/get-started/enable-your-device-for-development#accessing-settings-for-developers)

その後、下記サイトの「Windows Installation」で「download and run the Windows installer」をクリックしてください。これでインストーラーがダウンロードされます。

ダウンロードが終わり次第、インストーラを実行してください。

##### 2.1. voltaで環境のセットアップ

※ 必ず、`Taltner/client`ディレクトリで実行してください。

```bash
# Nodeのインストール
volta install node@21.7.3

# npmでパッケージのインストール
npm ci -or npm install
```

#### 3. ffmpegのインストール

Whisperを動かすための依存関係として、ffmpegをインストールします。

```pwsh
winget install --id=Gyan.FFmpeg  -e
```

## Usage

### server

※ 必ず、`Taltner`ディレクトリで実行してください。

```bash
cd server
poetry run python src/app.py
```

その後、別のターミナルを開いて、clientのセッティングを行ってください。

### client

※ 必ず、`Taltner`ディレクトリで実行してください。

```bash
cd client
npm run build
npm run start
```

その後、ブラウザで`http://localhost:3000`にアクセスしてください。


