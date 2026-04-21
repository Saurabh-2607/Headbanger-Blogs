"use client";
import { useEffect, useState } from 'react';

export default function PostSidebar({ content, title }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!content) return;

    const contentContainer = document.getElementById('mdx-content');
    const existingHeadings = contentContainer 
      ? contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6') 
      : document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    if (existingHeadings.length > 0) {
      const headingData = Array.from(existingHeadings)
        .map((heading, index) => {
          const level = parseInt(heading.tagName.charAt(1));
          const text = heading.textContent;
          let id = heading.id;
          
          if (!id) {
            id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;
            heading.id = id;
          }
          
          return { level, text, id };
        })
        .filter(heading => heading.text !== 'Suggested Posts' && heading.text !== 'TITLE' && heading.text !== title); // Filter title and specific headings

      setHeadings(headingData);
    } else {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingData = Array.from(headingElements)
        .map((heading, index) => {
          const level = parseInt(heading.tagName.charAt(1));
          const text = heading.textContent;
          const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;
          
          return { level, text, id };
        })
        .filter(heading => heading.text !== 'Suggested Posts' && heading.text !== 'TITLE' && heading.text !== title); // Filter title and specific headings

      setHeadings(headingData);
    }
  }, [content, title]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-10% 0% -80% 0%',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observe headings with a small delay to ensure DOM is ready
    setTimeout(() => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-80 my-6 hidden md:block sticky top-6">
      {headings.length > 0 && (
        <nav className="text-white/80 w-full font-sans">
          <div className="space-y-1.5">
            {headings.map((heading) => (
              <div
                key={heading.id}
                className={`cursor-pointer transition-colors duration-150 py-1 ${
                  activeId === heading.id 
                    ? 'text-white font-medium' 
                    : 'text-neutral-400/90 hover:text-white/90'
                }`}
                style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
                onClick={() => scrollToHeading(heading.id)}
              >
                <span className="text-[14px] leading-relaxed tracking-wide">
                  {heading.text}
                </span>
              </div>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}