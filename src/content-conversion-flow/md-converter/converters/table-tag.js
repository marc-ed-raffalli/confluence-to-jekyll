'use strict';

var common = require('../common')
  , codeBeautifier = require('../../../utils/code-beautifier');

/**
 * Converter for table.
 * Returns beautified HTML, does not convert to MD.
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 */
module.exports = function (mdConverter, structure, pageDetails) {
  return {
    filter: 'table',
    replacement: function (innerHTML, node) {
      // keep the outer HTML, do not convert nested tags to MD
      // as it will not be interpreted as MD

      // convert the link href to point to the new location
      Array.from(node.querySelectorAll('a'))
        .forEach(function (aNode) {
          common.convertLink(structure, pageDetails, aNode);
        });

      return codeBeautifier.html(node);
    }
  };
};
