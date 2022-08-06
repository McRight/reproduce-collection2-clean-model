/* eslint-disable prefer-arrow-callback */
/* global Package */

Package.describe({
  name: 'reproduce-collection2-clean-model',
  version: '0.9.0',
  summary: 'Test model package',
});

Package.onUse(function onUse(api) {
  api.versionsFrom('2.3');

  api.use([
    'accounts-base@2.2.1',
    'aldeed:collection2@2.10.0',
    'aldeed:collection2-core',
    'aldeed:simple-schema@1.5.4',
    'aldeed:schema-index',
    'aldeed:schema-deny',
    'cultofcoders:grapher',
    'ecmascript',
  ]);

  // Client & Server exports
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
});
