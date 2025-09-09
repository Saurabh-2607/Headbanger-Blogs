import fs from 'fs';
import path from 'path';

export function getContentImageUrl(slug, imageName) {
  const contentImagePath = path.join(process.cwd(), 'content', slug, imageName);
  const publicImagePath = path.join(process.cwd(), 'public', 'blog-images', slug);
  
  // Ensure public directory exists
  if (!fs.existsSync(publicImagePath)) {
    fs.mkdirSync(publicImagePath, { recursive: true });
  }
  
  const publicImageFile = path.join(publicImagePath, imageName);
  
  // Copy image to public if it doesn't exist
  if (fs.existsSync(contentImagePath) && !fs.existsSync(publicImageFile)) {
    fs.copyFileSync(contentImagePath, publicImageFile);
  }
  
  return `/blog-images/${slug}/${imageName}`;
}