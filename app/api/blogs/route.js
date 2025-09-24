
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// CORS middleware
function withCORS(handler) {
  return async function(req) {
    // Handle preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
    const res = await handler(req);
    // Add CORS headers to all responses
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  };
}

const handler = async (req) => {
  // Path to the content directory
  const contentDir = path.join(process.cwd(), 'content');

  // Helper to recursively find all index.md files (main blog pages)
  function findBlogIndexes(dir, parent = '') {
    let blogs = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        blogs = blogs.concat(findBlogIndexes(path.join(dir, entry.name), path.join(parent, entry.name)));
      } else if (entry.name === 'index.md') {
        blogs.push({
          slug: parent,
          file: path.join(dir, entry.name)
        });
      }
    }
    return blogs;
  }

  const blogs = findBlogIndexes(contentDir);

  // Get base URL from request
  const baseUrl = req.nextUrl ? req.nextUrl.origin : '';

  // Build response: title from frontmatter, link from slug
  const blogList = blogs.map(({ slug, file }) => {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const { data } = matter(fileContent);
    return {
      title: data.title || slug.replace(/-/g, ' '),
      link: `${baseUrl}/blog/${slug}`
    };
  });

  return new Response(JSON.stringify(blogList), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const GET = withCORS(handler);
