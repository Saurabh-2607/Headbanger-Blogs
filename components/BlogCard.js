import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Hash } from 'lucide-react';

export default function BlogCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-dashed border-border rounded-xl">
      <div className="relative h-60 w-full overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover "
          />
        ) : (
          <div className="w-full h-full bg-[url('/placeholder.jpg')] bg-cover bg-center flex items-center justify-center">
            <div className='h-full w-full bg-black/50 my-auto justify-center flex items-center'>
            <div className="text-center text-white">
              <div className="text-4xl mb-2">📄</div>
              <div className="text-sm font-medium opacity-75">{post.title}</div>
            </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5 md:p-6">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-normal font-serif text-white/90 mb-3 hover:text-primary transition-colors leading-tight tracking-wide">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
        </div>

        <div className="flex flex-wrap items-center text-[15px] font-sans text-white/80 tracking-wide mb-4 gap-4">
          <div className="flex items-center gap-1.5 opacity-90">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center gap-1.5 opacity-90">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-1.5 opacity-90">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <span
                key={tag} 
                className="px-2.5 py-1 text-[13px] text-white/85 bg-[#1a1815] font-medium font-sans tracking-wide rounded-md hover:bg-[#2a2825] transition-colors"
              >
                <Hash className="w-3.5 h-3.5 inline mr-1 opacity-70" />
                {tag}
              </span>
            ))}
          </div>
        )}


        {/* subpost on the card */}

        {/* {post.subposts && post.subposts.length > 0 && (
          <div className="border-t border-border pt-3">
            <p className="text-sm text-muted-foreground mb-2">
              {post.subposts.length} subpost{post.subposts.length > 1 ? 's' : ''}
            </p>
            <div className="space-y-0.5">
              {post.subposts.slice(0, 3).map((subpost) => (
                <div key={subpost.slug} className="text-xs text-muted-foreground opacity-75">
                  - {subpost.title}
                </div>
              ))}
              {post.subposts.length > 3 && (
                <div className="text-xs text-muted-foreground opacity-75">
                  ... and {post.subposts.length - 3} more
                </div>
              )}
            </div>
          </div>
        )} */}


      </div>
    </article>
  );
}
