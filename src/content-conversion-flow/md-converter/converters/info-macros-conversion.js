'use strict';

var baseIncludeTemplate = '{% include {{type}}.html content="\n{{text}}\n" %}'
  , iconClassToType = {
    'icon-hint': 'note',
    'icon-success': 'tip',
    'icon-problem': 'warning',
    'icon-warning': 'important'
  }
  , iconClassNames = Object.keys(iconClassToType)
  ;

/**
 * Converter for Confluence info macros
 * https://github.com/strongloop/loopback.io/wiki/Conversion-rules#notes-warnings-tips-etc
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 */
module.exports = function (mdConverter, structure, pageDetails) {
  return {
    filter: function (node) {
      return node.classList.contains('information-macro');
    },
    replacement: function (innerHTML, node) {
      var iconClassName = node.querySelector('.aui-icon').classList.item(1)
        ;

      if (iconClassNames.indexOf(iconClassName) === -1) {
        console.log('----------------------------');
        console.log('Missing type for for', iconClassName, 'in', pageDetails.baseFileName);
        console.log('----------------------------');
        return;
      }

      return baseIncludeTemplate
        .replace('{{type}}', iconClassToType[iconClassName])
        .replace('{{text}}', innerHTML.replace(/"/g, '\\"'));   // escape " to avoid conflict between nested content and
    }
  };
};
