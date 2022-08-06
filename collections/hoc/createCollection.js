// Meteor
import { Mongo } from 'meteor/mongo';

// import { HistorySchema } from '../../schemas'

// Collection
export const createCollection = ({ name, schemas }) => {
  class Collection extends Mongo.Collection {
    insert(doc, options, callback) {
      console.log('insert override');
      if (typeof options === 'function') {
        console.log('callback exists');
        callback = callback || options;
      } else if (!!options && options.userId) {
        console.log('callback does NOT exists');
        doc.createdAt = Date.now();
        doc.createdBy = options.userId;
      }
      console.log('go to super insert');

      // Call the original `insert` method, which will validate
      // against the schema
      return super.insert(doc, options, callback);
    }

    update(selector, modifier, options, callback) {
      console.log('update override');
      console.log(
        JSON.stringify({ selector, modifier, options, callback }, null, 2)
      );

      if (!!options && typeof options !== 'function' && options.userId) {
        console.log('options not function');
        if (!modifier.$set) modifier.$set = {};

        if (!options.bypassUpdateHistory) {
          const updatedAt = Date.now();
          console.log('not bypassing update history');

          modifier.$set.updatedAt = updatedAt;
          modifier.$set.updatedBy = options.userId;

          if (!modifier.$push) {
            console.log('push modifier craeted autmoatically');
            modifier.$push = {};
          }

          modifier.$push.updateHistory = {
            updatedBy: options.userId,
            updatedAt,
            addedFields: options.addedFields || [],
            updatedFields: options.updatedFields || [],
            removedFields: options.removedFields || [],
          };
        }
      }
      console.log('go to super update');

      // Call the original `update` method, which will validate
      // against the schema
      return super.update(selector, modifier, options, callback);
    }
  }

  const collection = new Collection(name);

  console.log('craeted collection ' + name);
  schemas.forEach((schema) => collection.attachSchema(schema));
  // collection.attachSchema(HistorySchema)
  console.log('attached schemas collection');

  return collection;
};
