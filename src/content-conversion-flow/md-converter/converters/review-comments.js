'use strict';

var codeBeautifier = require('../../../utils/code-beautifier');

/**
 * Converter for the review comments.
 * Leaves content as beautified HTML.
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 * @returns {{filter: filter, replacement: replacement}}
 */
module.exports = function (mdConverter, structure, pageDetails) {
  return {
    filter: function (node) {
      return node.classList.contains('sl-hidden');
    },
    replacement: function (innerHTML, node) {
      node.removeAttribute('style');
      node.className = 'sl-hidden';

      return codeBeautifier.html(node);
    }
  };
};
