/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig, isDev } from 'sanity';
import { structureTool } from 'sanity/structure';
import { huHULocale } from '@sanity/locale-hu-hu';
import { media } from 'sanity-plugin-media';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';

const devOnlyPlugins = [
  visionTool({
    defaultApiVersion: apiVersion,
    title: 'Query Playground',
  }),
];

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      title: 'Struktúra',
    }),
    huHULocale(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],
});
