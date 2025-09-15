import Link from 'next/link';
import { BookOpen, FileText } from 'lucide-react';

export default function PostNavigation({ mainTitle, mainRead, totalRead, subposts, currentSlug }) {
  if (!subposts || subposts.length === 0) {
    return null;
  }

  const totalReadingTime = (() => {
    const extractMinutes = (readTime) => {
      const match = typeof readTime === 'string' && readTime.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const parentMinutes = extractMinutes(mainRead);
    const subpostMinutes = subposts.reduce(
      (sum, sub) => sum + extractMinutes(sub.readTime),
      0
    );
    const total = parentMinutes + subpostMinutes;
    return `${total} min read`;
  })();

  return (
    <nav className="text-neutral-100 w-full shadow-md sticky top-6">
      <div className='flex flex-col gap-2'>
        <div className="flex items-center gap-2 border border-neutral-800 p-2">
          <BookOpen className="w-5 h-5 text-neutral-400" />
          <div>
            <div className="font-medium text-sm leading-tight">{mainTitle}</div>
            <div className="text-xs text-neutral-400">
              {mainRead} <span>({totalReadingTime} total)</span>
            </div>
          </div>
        </div>
        {subposts.map((subpost) => (
          <div key={subpost.slug} className="flex w-full p-2 items-center border border-neutral-800">
            <Link
              href={`/blog/${subpost.parentSlug}/${subpost.slug}`}
              className="items-center flex ml-1 gap-2 w-full transition-colors duration-150"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              <div className='w-full items-center'>
                <div className="text-left text-xs">{subpost.title}</div>
                <div className="items-center gap-1 text-[10px] text-neutral-400">
                  {subpost.readTime}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
