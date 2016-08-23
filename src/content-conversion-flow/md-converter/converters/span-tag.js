'use strict';

/**
 * Converter for span, returns converted content or discards if blacklisted class name.
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 */
module.exports = function (mdConverter, structure, pageDetails) {
  return {
    filter: 'span',
    replacement: function (innerHTML, node) {
      var discard = [
        'aui-icon'
      ].some(function (blackListClassName) {
        return node.classList.contains(blackListClassName);
      });

      return discard ? '' : innerHTML;
    }
  };
};
