// Schema
import { PageSchema } from '../schemas';

// HOC
import { createCollection } from './hoc/createCollection';

// Collection
export const Pages = createCollection({
  name: 'TestPages',
  schemas: [PageSchema],
});

// Security Policy (no direct insert on client side)
Pages.allow({
  insert() {
    return false;
  },
  update() {
    return false;
  },
  remove() {
    return false;
  },
});

Pages.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});
