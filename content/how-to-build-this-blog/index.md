---
cover: "./cover.png"
title: "How to Build a Blogging Application Like Headbanger Blogs"
description: "Step-by-step guide to building a modern markdown-powered blogging platform with Next.js, MDX, and a content-first architecture."
date: "2026-03-01"
author: "Headbanger"
tags: ["Next.js", "Blogging", "Full Stack", "JavaScript", "MDX", "Tutorial"]
---

# How to Build a Blogging Application Like Headbanger Blogs

This guide walks you through how to build a blogging platform similar to **Headbanger Blogs**:

- Content lives in Markdown/MDX files inside a `content/` folder
- Next.js (App Router) handles routing, rendering, and SEO
- A small `lib/blog.js` module reads files, parses frontmatter, and computes `reading-time`
- The UI is built with React components and Tailwind CSS

You can follow this guide to either:

- Rebuild this project from scratch, or
- Understand how this repository works so you can customize it

---

## 1. Project Setup

### 1.1 Initialize a Next.js App Router project

Use the official Next.js starter:

```bash
npx create-next-app@latest headbanger-blogs
cd headbanger-blogs
```

Make sure you choose:
- **App Router** (recommended)
- **TypeScript or JavaScript** (this project uses JavaScript for most files)
- **Tailwind CSS** (or add it later)

### 1.2 Install required dependencies

This project relies on a few key packages:

- `gray-matter` – parse frontmatter from Markdown
- `react-markdown` – render Markdown as React components
- `reading-time` – estimate reading time from content
- `lucide-react` – icons
- `tailwindcss` + plugins – styling and typography

Install them:

```bash
npm install gray-matter react-markdown reading-time lucide-react
```

If you didn't enable Tailwind in the Next.js wizard, also install and set it up following the Tailwind docs.

---

## 2. Content-First Architecture (Markdown + Folders)

Instead of storing posts in a database, this blog uses **files on disk**. This keeps things simple and works great for personal blogs and documentation sites.

### 2.1 Directory structure

At the root of the project, create a `content/` folder. Each top-level folder inside `content/` represents **one main blog post / topic**:

```text
content/
	getting-started-react/
		index.md
		hooks-and-state/
			subpost.mdx
	advanced-javascript/
		index.md
		async-programming/
			subpost.mdx
```

- `index.md` – the main article for that topic
- Each subfolder contains a `subpost.mdx` file – deeper sub-articles under the main topic

### 2.2 Frontmatter and body

Each `index.md` looks like this:

```markdown
---
cover: "./cover.png"
title: "Getting Started with React: A Complete Guide"
description: "Short description for the home page and SEO."
date: "2024-01-15"
author: "Headbanger"
tags: ["React", "JavaScript", "Frontend"]
---

# Main Title

Your Markdown content starts here.
```

- The `---` block is **frontmatter** – metadata used for the home page, cards, and SEO
- The rest is standard Markdown, rendered by `react-markdown` with custom components

Subposts (`subpost.mdx`) use similar frontmatter:

```md
---
title: "Async Programming in JavaScript"
description: "Learn how to use callbacks, promises, and async/await."
---

# Async Programming in JavaScript

Content...
```

---

## 3. Reading and Transforming Content (`lib/blog.js`)

The file `lib/blog.js` is the heart of the content system. It:

- Reads directories inside `content/`
- Parses each `index.md` with `gray-matter`
- Computes `readTime` using `reading-time`
- Finds and attaches a `coverImage` using `imageUtils`
- Discovers subposts (folders with `subpost.mdx`)

The important exported functions are:

- `getAllBlogPosts()` – returns all top-level posts with metadata + content
- `getBlogPost(slug)` – returns one post by folder name
- `getSubPost(blogSlug, subpostSlug)` – returns a specific subpost
- `getPreviousPost` / `getNextPost` – for navigation
- `getSuggestedPosts` – returns a small, shuffled list of other posts

### 3.1 How `getAllBlogPosts()` works (conceptually)

1. Read all directories in `content/` using Node's `fs` and `path`
2. For each directory:
	 - Read `index.md`
	 - Use `gray-matter` to split `frontmatter` and `content`
	 - Compute `readingTime(content).text`
	 - Find or compute `coverImage`
	 - Load subposts with `getSubPosts(slug)`
3. Sort posts by `date` (newest first)

You don't usually need to change this logic unless you:
- Add new metadata fields
- Want a different sorting method
- Store content somewhere else (e.g., CMS or database)

---

## 4. Routing and Pages (App Router)

This project uses the **App Router** (`app/` directory) to define pages.

### 4.1 Home page – list of all posts

File: `app/page.js`

- Calls `getAllBlogPosts()`
- Passes the result into a client component `HomeClient`
- `HomeClient` handles search, filter by tag, and renders cards via `BlogCard`

This keeps data loading on the server but interactivity on the client.

### 4.2 Dynamic route for main posts

File: `app/blog/[slug]/page.js`

Route: `/blog/:slug`

Responsibilities:

- Use `getBlogPost(slug)` to fetch the post data
- Use `getPreviousPost` / `getNextPost` and `getSuggestedPosts` to build navigation
- Render the cover image, title, meta (author, date, read time, tags)
- Render the body using:

```jsx
<ReactMarkdown components={MDXComponents}>
	{post.content}
</ReactMarkdown>
```

- Use `PostSidebar` to build a dynamic table of contents from headings
- Use `PostNavigation` to show subposts and suggested posts

### 4.3 Dynamic route for subposts

Folder structure:

```text
app/
	blog/
		[slug]/
			page.js        // main post
			[subpost]/
				page.js      // subpost
```

Route: `/blog/:slug/:subpost`

The subpost page:

- Uses `getSubPost(slug, subpostSlug)` from `lib/blog.js`
- Renders content with `ReactMarkdown` + `MDXComponents`
- Reuses navigation components for a consistent experience

---

## 5. Rendering Markdown Nicely (`MDXComponents.js`)

Markdown is rendered via `react-markdown` and a custom `MDXComponents` map.

`components/MDXComponents.js` customizes the look of:

- Headings (`h1`–`h6`)
- Paragraphs (`p`)
- Lists (`ul`, `ol`, `li`)
- Links (`a`)
- Code blocks (`pre`, `code`)
- Tables, images, blockquotes, etc.

This gives you **full control** over how Markdown appears, while keeping the content plain-text and easy to edit.

If you want to change typography or spacing, you only edit `MDXComponents.js`, not each post.

---

## 6. Sidebar and Navigation Features

### 6.1 Table of contents sidebar

`components/LeftSidebar.js` (exported as `PostSidebar`) dynamically builds a list of headings by:

1. Scanning the rendered document for `h1–h6` tags
2. Generating IDs for headings if they don't exist
3. Tracking which heading is currently visible using `IntersectionObserver`
4. Rendering a clickable list that smoothly scrolls to each section

This gives you an automatic **Table of Contents** for long articles—no extra work in the content files.

### 6.2 Subpost + suggested posts navigation

`components/RightSidebar.js` (exported as `PostNavigation`) renders:

- The main article title and total reading time (main + subposts)
- A list of subposts, each with its own estimated reading time
- A "Suggested Posts" section with other relevant articles

These components turn a simple blog into a **mini learning platform** with structured navigation.

---

## 7. Styling with Tailwind CSS

The UI is built using Tailwind CSS classes:

- Layout: `flex`, `grid`, responsive widths (`w-full`, `md:w-[50vw]`, etc.)
- Colors: `bg-background`, `text-muted-foreground`, etc.
- Typography: utility classes for headings, spacing, and text colors

To customize the look:

1. Update the global styles in `app/globals.css`
2. Adjust Tailwind config (colors, fonts, etc.)
3. Tweak component classes in `components/` for specific layouts

---

## 8. Adding a New Post (Your Workflow)

Once the system is set up, adding a new blog topic is simple:

1. Create a new folder inside `content/` using a URL-friendly slug, e.g.:

	 ```text
	 content/
		 my-new-topic/
			 index.md
	 ```

2. Add frontmatter and content to `index.md`:

	 ```md
	 ---
	 cover: "./cover.png"
	 title: "My New Topic"
	 description: "Short description for the home page."
	 date: "2026-03-01"
	 author: "Headbanger"
	 tags: ["Tutorial", "JavaScript"]
	 ---

	 # My New Topic

	 Your Markdown content here.
	 ```

3. (Optional) Add subposts:

	 ```text
	 content/
		 my-new-topic/
			 index.md
			 part-1/
				 subpost.mdx
			 part-2/
				 subpost.mdx
	 ```

4. Commit your changes and deploy – the new post automatically:
	 - Appears on the home page
	 - Gets its own `/blog/my-new-topic` route
	 - Benefits from all navigation, sidebars, and styling

---

## 9. Deployment

You can deploy this app to any Next.js-compatible platform. Common options:

- **Vercel** – first-class support for Next.js, zero-config deployments
- **Netlify** – good support for static/SSR Next.js apps
- **Self-hosted** – Node server or Docker container

Typical workflow with Vercel:

1. Push your project to GitHub
2. Connect the repository in Vercel
3. Vercel auto-detects Next.js and builds the app
4. Every push to `main` triggers a new deployment

---

## 10. How to Customize This Blog for Your Own Use

Once you understand the structure, you can:

- Change the branding (logo, site name, colors)
- Add new layout components (e.g., a top navigation bar)
- Extend frontmatter with new fields (e.g., `category`, `difficulty`, `series`)
- Integrate analytics or comments
- Swap file-based content for a headless CMS later, keeping the same rendering components

Because the content system and UI are decoupled, you can iterate on the design without touching the Markdown files—and vice versa.

---

## 11. Summary

To build a blogging app like this one, you mainly need to:

1. **Set up Next.js + Tailwind CSS**
2. **Design a content-first structure** in `content/` with `index.md` + `subpost.mdx`
3. **Write helper functions** in `lib/blog.js` to read files and return structured data
4. **Create dynamic routes** under `app/blog/[slug]` and `app/blog/[slug]/[subpost]`
5. **Render Markdown with custom components** via `react-markdown` + `MDXComponents`
6. **Enhance UX** with navigation, sidebars, reading time, and suggested posts

This repository already includes all of these pieces—use this guide as a map to understand, extend, and build your own version of Headbanger Blogs.
