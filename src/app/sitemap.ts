// Dynamic sitemap generator for Next.js App Router
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.fusioninfotech.com'; // Update to your real domain
    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/dashboard`,
            lastModified: new Date(),
        },
    ];
} 