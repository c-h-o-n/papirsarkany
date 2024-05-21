/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true, // (optional)
  changefreq: "monthly",
  priority: 1,
  exclude: ["/admin", "/admin/*", "/penztar"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin/",
      },
    ],
  },
};
