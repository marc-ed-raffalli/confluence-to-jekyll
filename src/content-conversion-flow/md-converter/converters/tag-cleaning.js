'use strict';

/**
 * Discards blacklisted tags.
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 */
module.exports = function (mdConverter, structure, pageDetails) {
  return {
    filter: function (node) {
      var blackListedClasses = [
        'toc-macro', 'hidden'
      ];

      return node.type === 'hidden' ||
        ['SCRIPT', 'STYLE'].indexOf(node.tagName) !== -1 ||
        blackListedClasses.some(function (className) {
          return node.classList.contains(className);
        });
    },
    replacement: function () {
      return '';
    }
  };
};
