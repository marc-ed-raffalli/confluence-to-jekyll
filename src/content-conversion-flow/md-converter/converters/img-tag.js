'use strict';

var baseIncludeTemplate = '{% include image.html file="{{src}}" alt="{{alt}}" %}';

/**
 * Converter for images, outputs directly to Jekyll template format
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 */
module.exports = function (mdConverter, structure, pageDetails) {
  return {
    filter: 'img',
    replacement: function (innerHTML, node) {
      return baseIncludeTemplate
        .replace('{{src}}', node.src)
        .replace('{{alt}}', node.alt);
    }
  };
};
