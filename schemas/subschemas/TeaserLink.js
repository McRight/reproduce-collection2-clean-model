// Npm
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Random } from 'meteor/random';

// Utils
import { adjustUrl, customValidation } from '../../model';

// Link schema definition
export const TeaserLinkSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue() {
      const hasId = this.value > '';

      if (!hasId) this.value = Random.id();

      return this.value;
    },
  },

  url: {
    type: String,
    custom: customValidation,

    // regEx: SimpleSchema.RegEx.Url,
    optional: true,
    autoValue() {
      return adjustUrl(this.value);
    },
  },

  name: {
    type: String,
    optional: true,
  },

  isShop: { type: Boolean, optional: true, defaultValue: false },
  isSession: { type: Boolean, optional: true, defaultValue: false },

  visible: { type: Boolean, defaultValue: true },
});
