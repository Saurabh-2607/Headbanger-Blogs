# Headbanger Blogs

A content-driven blog platform built with Next.js App Router. It renders posts from the local `content/` directory, supports nested subposts, and provides basic SEO/OG support.

## Features

- File-based content from Markdown and MDX
- Blog listing with search and tag filtering
- Post and subpost pages with previous/next navigation
- Suggested posts and side navigation
- Dynamic Open Graph image API routes
- Static generation for posts and subposts

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- `gray-matter` for frontmatter parsing
- `react-markdown` for content rendering
- `reading-time` for estimated reading time

## Project Structure

```text
app/                  # Routes, pages, API handlers
components/           # UI and layout components
content/              # Blog content (one folder per post)
lib/                  # Content loading and helper utilities
public/blog-images/   # Published static images
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3. Production build

```bash
npm run build
npm run start
```

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run Next.js lint checks

## Content Authoring

Each top-level blog post lives under `content/<post-slug>/index.md`.

Example:

```text
content/getting-started-react/
	index.md
	react-fundamentals/
		subpost.mdx
	hooks-and-state/
		subpost.mdx
```

### `index.md` frontmatter example

```md
---
title: Getting Started with React
description: Introductory React concepts and setup.
date: 2026-01-10
author: Saurabh Sharma
tags:
	- react
	- javascript
cover: cover.jpg
---
```

### `subpost.mdx` frontmatter example

```mdx
---
title: React Fundamentals
description: Components, props, and state basics.
date: 2026-01-11
author: Saurabh Sharma
---
```

Notes:

- Subposts are discovered only when `subpost.mdx` exists in a child folder.
- If `cover` is omitted, the loader falls back to files matching `cover.*` in the post directory.

## Routes

- `/` - Home page with searchable post listing
- `/blog/[slug]` - Main post page
- `/blog/[slug]/[subpost]` - Subpost page
- `/api/blogs` - Blog metadata/content API
- `/api/og/[...slug]` - Dynamic OG image API

## Deployment

The app is a standard Next.js app and can be deployed on Vercel or any Node.js-compatible hosting platform.
