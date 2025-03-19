import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/xamplejson/',
    component: ComponentCreator('/xamplejson/', 'a55'),
    routes: [
      {
        path: '/xamplejson/',
        component: ComponentCreator('/xamplejson/', '0c9'),
        routes: [
          {
            path: '/xamplejson/',
            component: ComponentCreator('/xamplejson/', '32c'),
            routes: [
              {
                path: '/xamplejson/intro',
                component: ComponentCreator('/xamplejson/intro', '99e'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
