/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/basic-concepts',
      ],
    },
    {
      type: 'category',
      label: 'IA Core',
      items: [
        'ia-core/api/core-functions',
        'ia-core/api/components',
        'ia-core/api/events',
        'ia-core/api/utilities',
      ],
    },
    {
      type: 'category',
      label: 'Island Adventures',
      items: [
        'island-adventures/guides/island-types',
        'island-adventures/guides/boat-system',
        'island-adventures/guides/mobs-system',
      ],
    },
    {
      type: 'category',
      label: 'DST API',
      items: [
        'dst-api/examples/basic',
        'dst-api/examples/advanced',
        'dst-api/examples/networking',
        'dst-api/examples/ai-system',
        'dst-api/examples/troubleshooting',
      ],
    },
  ],
}; 