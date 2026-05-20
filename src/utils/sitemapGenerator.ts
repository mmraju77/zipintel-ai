export const generateSitemap = (baseUrl: string): string => {
  const countries = [
    { code: 'in', name: 'india', anchors: ['visakhapatnam', 'paderu', 'hyderabad'] },
    { code: 'us', name: 'usa', anchors: ['los-angeles', 'new-york', 'san-francisco'] },
    { code: 'gb', name: 'uk', anchors: ['london', 'manchester'] },
    { code: 'ca', name: 'canada', anchors: [] },
    { code: 'au', name: 'australia', anchors: [] },
    { code: 'de', name: 'germany', anchors: ['munich', 'berlin'] },
    { code: 'ae', name: 'uae', anchors: [] },
    { code: 'ch', name: 'switzerland', anchors: [] },
    { code: 'no', name: 'norway', anchors: [] },
    { code: 'se', name: 'sweden', anchors: [] },
    { code: 'dk', name: 'denmark', anchors: [] },
    { code: 'nl', name: 'netherlands', anchors: [] },
    { code: 'sg', name: 'singapore', anchors: [] },
    { code: 'nz', name: 'new-zealand', anchors: [] },
    { code: 'ie', name: 'ireland', anchors: [] },
    { code: 'at', name: 'austria', anchors: [] },
    { code: 'lu', name: 'luxembourg', anchors: [] }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Root
  xml += `
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Country Roots & Anchors
  countries.forEach(({ code, name, anchors }) => {
    // Country page
    xml += `
  <url>
    <loc>${baseUrl}/${name}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Showcase Anchors (Hierarchical context)
    anchors.forEach(anchor => {
      xml += `
  <url>
    <loc>${baseUrl}/zip/${code}/${anchor}/ZIPINTEL-NODE</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    // Algorithmic Template structure (Exposing the route pattern to search engines)
    xml += `
  <url>
    <loc>${baseUrl}/zip/${code}/region/zipCode</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
  });

  xml += `
</urlset>`;
  return xml.trim();
};
