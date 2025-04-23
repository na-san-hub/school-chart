# IT スクール口コミサイト

![スクチャIT](/logo.png)

IT スクールの口コミを検索・閲覧できる Web アプリケーションです。ユーザーはスクールの情報を閲覧したり、口コミを投稿したりすることができます。

## 主な機能

- **スクール検索**: キーワード、エリア、スキル、職種などの条件でスクールを検索
- **スクール詳細表示**: 各スクールの詳細情報、評価、コース一覧、口コミの閲覧
- **口コミ投稿**: 認証ユーザーによるスクール評価・口コミの投稿
- **ユーザー認証**: 会員登録・ログイン機能（Email/Password, Google 認証）
- **マイページ機能**: 投稿した口コミの管理、お気に入りスクールの保存

## 技術スタック

### フロントエンド

- **Next.js 15**: React フレームワーク
- **React 19**: UI ライブラリ
- **TypeScript**: 型安全な JavaScript
- **TailwindCSS**: スタイリング
- **Prisma ORM**: データベースアクセス

### バックエンド

- **Next.js (App Router)**: サーバーサイドの処理
- **Server Actions**: サーバーサイド処理の実装

### データベース

- **PostgreSQL**: リレーショナルデータベース
- **Supabase**: 認証・ストレージ管理

### その他のライブラリ

- **Lucide React**: アイコンコンポーネント
- **Recharts**: データの可視化グラフ

## インストール方法

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/it-school-review.git
cd it-school-review/client

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 環境構築

1. `.env.local` ファイルをプロジェクトルートに作成し、以下の環境変数を設定:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
DIRECT_URL="postgresql://username:password@localhost:5432/database_name"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Prisma マイグレーションを実行してデータベースをセットアップ:

```bash
npx prisma migrate dev
```

## ディレクトリ構造

```
client/
├── app/                  # Next.js App Router
│   ├── (top)/            # トップページ関連
│   ├── actions/          # Server Actions
│   ├── auth/             # 認証関連
│   ├── components/       # 共有コンポーネント
│   ├── context/          # Reactコンテキスト
│   ├── lib/              # ユーティリティ関数
│   ├── login/            # ログインページ
│   ├── logout/           # ログアウトページ
│   ├── mypage/           # マイページ
│   ├── register/         # ユーザー登録ページ
│   ├── schools/          # スクール詳細ページ
│   ├── search/           # 検索ページ
│   └── types/            # TypeScript型定義
├── prisma/               # Prismaスキーマ・マイグレーション
└── public/               # 静的ファイル
```

## 主要コンポーネント

### トップページ

- `HeroSection`: ヒーローイメージとキャッチコピー
- `TopSearchForm`: 検索フォーム
  - `KeywordSearch`: キーワード検索
  - `CareerSearch`: 職種から検索
  - `DetailSearch`: こだわり条件から検索

### 検索ページ

- `SearchHeader`: 検索条件入力フォーム
- `SearchResults`: 検索結果一覧
- `SearchResultCard`: 検索結果カード

### スクール詳細ページ

- `SchoolHeader`: スクール基本情報
- `ChartSection`: レーダーチャート評価表示
- `SchoolDetail`: スクール詳細情報
- `ReviewCard`: 口コミカード

### マイページ

- `UserInformation`: ユーザー情報表示
- `UserReview`: 投稿した口コミ一覧
- `FavoriteList`: お気に入りスクール一覧

## 認証の仕組み

このアプリは Supabase を使用した認証を実装しています：

1. Email/Password 認証または Google OAuth 認証
2. 認証後、`AuthContext`でユーザー状態を管理
3. 認証情報は Supabase セッションとして保存
4. Server Actions はサーバーサイドでセッションを検証

## データモデル

主要なデータモデルは以下の通りです：

- `User`: ユーザー情報
- `School`: スクール情報
- `Course`: コース情報
- `Review`: 口コミ評価
- `Rating`: スクール評価
- `FavoriteSchool`: お気に入りスクール

詳細は`prisma/schema.prisma`ファイルを参照してください。

## クライアントサイド・サーバーサイドの実装

### Server Components

- 静的な UI 要素
- データ取得・表示ロジック

### Client Components

- ユーザーインタラクション処理
- フォーム操作
- 動的 UI 要素

### Server Actions

- データベース操作
- 認証・認可処理
- データ更新処理

## パフォーマンス最適化

- Suspense によるロード状態の管理
- 動的レンダリングとキャッシュ戦略
- クライアントサイドのステート最小化

## 今後の拡張予定

- レスポンシブデザインの改善
- 検索機能の拡張（検索履歴、おすすめ機能など）
- ランキングや特集ページ
- より詳細なスクール比較機能
