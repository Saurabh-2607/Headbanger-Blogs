import React from 'react';

export default async function DynamicComponent({ slug, name, ...props }) {
  try {
    const Component = (await import(`../content/${slug}/${name}.jsx`)).default;
    return <Component {...props} />;
  } catch (error) {
    console.error(`Failed to load dynamic component: ${slug}/${name}`, error);
    return <div className="p-4 border border-red-500 text-red-500 bg-red-500/10">Error loading component: {name}</div>;
  }
}
