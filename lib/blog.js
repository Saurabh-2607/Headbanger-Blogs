import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllBlogPosts() {
  try {
    const blogDirs = fs.readdirSync(contentDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    return blogDirs.map(blogDir => {
      const blogPath = path.join(contentDirectory, blogDir);
      const indexPath = path.join(blogPath, 'index.md');
      
      if (!fs.existsSync(indexPath)) {
        throw new Error(`index.md not found in ${blogDir}`);
      }

      const fileContent = fs.readFileSync(indexPath, 'utf8');
      const { data, content } = matter(fileContent);
      
      const subposts = getSubPosts(blogDir);
      
      return {
        slug: blogDir,
        title: data.title || blogDir,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Anonymous',
        tags: data.tags || [],
        readTime: readingTime(content).text,
        content,
        subposts,
      };
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getBlogPost(slug) {
  try {
    const blogPath = path.join(contentDirectory, slug);
    const indexPath = path.join(blogPath, 'index.md');
    
    if (!fs.existsSync(indexPath)) {
      return null;
    }

    const fileContent = fs.readFileSync(indexPath, 'utf8');
    const { data, content } = matter(fileContent);
    
    const subposts = getSubPosts(slug);
    
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      readTime: readingTime(content).text,
      content,
      subposts,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

function getSubPosts(blogSlug) {
  try {
    const blogPath = path.join(contentDirectory, blogSlug);
    
    if (!fs.existsSync(blogPath)) {
      return [];
    }

    const subpostDirs = fs.readdirSync(blogPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    return subpostDirs.map(subpostDir => {
      const subpostPath = path.join(blogPath, subpostDir, 'subpost.mdx');
      
      if (!fs.existsSync(subpostPath)) {
        throw new Error(`subpost.mdx not found in ${subpostDir}`);
      }

      const fileContent = fs.readFileSync(subpostPath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        slug: subpostDir,
        title: data.title || subpostDir,
        description: data.description || '',
        content,
        readTime: readingTime(content).text,
        parentSlug: blogSlug,
      };
    });
  } catch (error) {
    console.error(`Error reading subposts for ${blogSlug}:`, error);
    return [];
  }
}

export function getSubPost(blogSlug, subpostSlug) {
  try {
    const subpostPath = path.join(contentDirectory, blogSlug, subpostSlug, 'subpost.mdx');
    
    if (!fs.existsSync(subpostPath)) {
      return null;
    }

    const fileContent = fs.readFileSync(subpostPath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      slug: subpostSlug,
      title: data.title || subpostSlug,
      description: data.description || '',
      content,
      readTime: readingTime(content).text,
      parentSlug: blogSlug,
    };
  } catch (error) {
    console.error(`Error reading subpost ${blogSlug}/${subpostSlug}:`, error);
    return null;
  }
}
