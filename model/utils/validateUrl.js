// Npm
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,12}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export function customValidation() {
  var reg = new RegExp(urlRegex, 'i');

  const platform = 'url';

  if (this.value > '' && !reg.test(this.value) && platform !== 'mail') {
    return 'wrong url';
  }
}

const UrlValidateContext = new SimpleSchema({
  url: {
    type: String,
    custom: customValidation,
  },
}).newContext();

export const validateUrl = (value) => {
  let isValid = !value > '';

  if (value > '') {
    const url =
      value.startsWith('http://') || value.startsWith('https://')
        ? value
        : `http://${value}`;

    UrlValidateContext.validate({ url });
    isValid = UrlValidateContext.isValid();
  } else if (!value) {
    isValid = false;
  }

  return isValid;
};
