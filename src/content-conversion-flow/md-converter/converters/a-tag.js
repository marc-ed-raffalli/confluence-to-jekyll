'use strict';

var common = require('../common');

/**
 * Converter for links, updates also the internal navigation links.
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 */
module.exports = function (mdConverter, structure, pageDetails) {
  return {
    filter: 'a',
    replacement: function (innerHTML, node) {
      common.convertLink(structure, pageDetails, node);

      if (!node.href || !innerHTML) {
        console.log('----------------------------');

        if (!innerHTML) {
          console.log('No text for link to', node.href, 'in', pageDetails.baseFileName);
        }
        if (!node.href) {
          console.log('Missing link for', node.href, 'in', pageDetails.baseFileName);
        }

        console.log('----------------------------');
        return '';
      }

      return [
        '[', innerHTML, ']', '(', node.href, ')'
      ].join('');
    }
  };
};
