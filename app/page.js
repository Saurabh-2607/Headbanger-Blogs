import { getAllBlogPosts } from '@/lib/blog';
import HomeClient from './home-client';

export default function Home() {
  const blogs = getAllBlogPosts();
  
  return <HomeClient initialBlogs={blogs} />;
}
