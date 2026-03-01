import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { getContentImageUrl } from './imageUtils.js';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllBlogPosts() {
  const blogDirs = fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  return blogDirs.map(slug => {
    const indexPath = path.join(contentDirectory, slug, 'index.md');
    
    if (!fs.existsSync(indexPath)) {
      throw new Error(`index.md not found for blog: ${slug}`);
    }

    const fileContent = fs.readFileSync(indexPath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Get cover image from frontmatter or find in directory
    let coverImagePath = null;
    
    if (data.cover) {
      // If cover is specified in frontmatter, resolve the path
      let imageName;
      if (data.cover.startsWith('./')) {
        // Relative path from content directory
        imageName = data.cover.substring(2); // Remove './'
      } else if (data.cover.startsWith('/')) {
        // Skip processing for absolute paths
        coverImagePath = data.cover;
      } else {
        // Assume it's a filename in the blog directory
        imageName = data.cover;
      }
      
      // Use imageUtils to handle copying and get URL
      if (imageName && !coverImagePath) {
        coverImagePath = getContentImageUrl(slug, imageName);
      }
    } else {
      // Fallback: Find cover image in the blog directory
      const blogDir = path.join(contentDirectory, slug);
      const files = fs.readdirSync(blogDir);
      const coverImage = files.find(file => 
        file.startsWith('cover') && 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      );
      
      if (coverImage) {
        coverImagePath = getContentImageUrl(slug, coverImage);
      }
    }

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      readTime: readingTime(content).text,
      content,
      coverImage: coverImagePath, // Changed from 'cover' to 'coverImage'
      subposts: getSubPosts(slug),
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogPost(slug) {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug);
}

function getSubPosts(blogSlug) {
  try {
    const blogPath = path.join(contentDirectory, blogSlug);
    
    if (!fs.existsSync(blogPath)) {
      return [];
    }

    const subpostDirs = fs.readdirSync(blogPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      // Only keep subdirectories that actually contain a subpost.mdx file
      .filter(subpostDir => fs.existsSync(path.join(blogPath, subpostDir, 'subpost.mdx')));

    return subpostDirs.map(subpostDir => {
      const subpostPath = path.join(blogPath, subpostDir, 'subpost.mdx');

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
  const subposts = getSubPosts(blogSlug);
  return subposts.find(subpost => subpost.slug === subpostSlug);
}

export function getPreviousSubPost(blogSlug, currentSubpostSlug) {
  const subposts = getSubPosts(blogSlug);
  const currentIndex = subposts.findIndex(subpost => subpost.slug === currentSubpostSlug);
  
  if (currentIndex === -1 || currentIndex === 0) {
    return null; // No previous subpost
  }
  
  return subposts[currentIndex - 1];
}

export function getNextSubPost(blogSlug, currentSubpostSlug) {
  const subposts = getSubPosts(blogSlug);
  const currentIndex = subposts.findIndex(subpost => subpost.slug === currentSubpostSlug);
  
  if (currentIndex === -1 || currentIndex === subposts.length - 1) {
    return null; // No next subpost
  }
  
  return subposts[currentIndex + 1];
}


export function getPreviousPost(currentSlug) {
  const posts = getAllBlogPosts(); // Already sorted by date (newest first)
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1 || currentIndex === posts.length - 1) {
    return null; // No previous post (this is the oldest)
  }
  
  return posts[currentIndex + 1]; // Next in array is previous by date
}

export function getNextPost(currentSlug) {
  const posts = getAllBlogPosts(); // Already sorted by date (newest first)
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1 || currentIndex === 0) {
    return null; // No next post (this is the newest)
  }
  
  return posts[currentIndex - 1]; // Previous in array is next 
}

export function getSuggestedPosts(currentSlug, limit = 3) {
  const allPosts = getAllBlogPosts();
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug);
  const shuffled = otherPosts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}