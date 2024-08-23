import { env } from './src/lib/env';

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: env.SITE_URL,
  generateRobotsTxt: true, // (optional)
  changefreq: 'monthly',
  priority: 1,
  exclude: ['/admin', '/admin/*', '/penztar'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
  },
};
