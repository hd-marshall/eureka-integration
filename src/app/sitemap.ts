// Dynamic sitemap generator for Next.js App Router
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.eurekaintegration.com'; // Update to your real domain
    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
        },
    ];
} 