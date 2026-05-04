import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://astrologylight4all.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/blog',
    '/contact',
    '/free-analysis',
    '/testimonials',
    '/consultation-room',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // You would typically fetch dynamic routes here (e.g., /blog/post-1)
  
  return routes;
}
