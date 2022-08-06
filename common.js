// import Collection2 from 'meteor/aldeed:collection2'

// // The values shown are the default options used internally. Overwrite them if needed.
// Collection2.cleanOptions = {
//   filter: true,
//   autoConvert: true,
//   removeEmptyStrings: true,
//   trimStrings: true,
//   removeNullsFromArrays: true,
// }

// console.log('set values')

// console.log({ optionsClean: Collection2.cleanOptions })

export const testHello = () => {
  console.log('hello from models');
};

export * from './collections';
export * from './model';
export * from './schemas';
