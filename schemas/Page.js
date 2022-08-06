// Meteor
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { TeaserLinkSchema } from './subschemas/TeaserLink';

// Page schema definition
export const PageSchema = new SimpleSchema(
  {
    'content.teaserLinks': { type: Object, defaultValue: {} },
    'content.teaserLinks.list': { type: Array, defaultValue: [] },
    'content.teaserLinks.list.$': { type: TeaserLinkSchema },
  },
  { clean: true }
);
