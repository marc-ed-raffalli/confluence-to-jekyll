'use strict';

var toMarkdown = require('to-markdown');

function mdConverter(structure, pageDetails, htmlStr) {
  return toMarkdown(htmlStr, {
    converters: [
      require('./converters/a-tag'),
      require('./converters/code-block'),
      require('./converters/img-tag'),
      require('./converters/info-macros-conversion'),
      require('./converters/review-comments'),
      require('./converters/keep-content-only'),
      require('./converters/span-tag'),
      require('./converters/table-tag'),
      require('./converters/tag-cleaning')
    ].map(function (fct) {
      return fct(mdConverter, structure, pageDetails);
    })
  });
}

module.exports = mdConverter;
