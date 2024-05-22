/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';

export const devOnlyPlugins = [
  visionTool({
    defaultApiVersion: apiVersion,
    title: 'Query Playground',
  }),
];
