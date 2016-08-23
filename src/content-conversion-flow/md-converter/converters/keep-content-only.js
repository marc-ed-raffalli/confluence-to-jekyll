'use strict';

/**
 * Converter for blacklisted tags, converts and returns the content only.
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 * @returns {{filter: filter, replacement: replacement}}
 */
module.exports = function (mdConverter, structure, pageDetails) {

  function isNodeToDiscard(node) {
    var blackListedClasses = [
      'apic',
      'cell',
      'innerCell',
      'details',
      'panel',
      'panelHeader',
      'code',
      'table-wrap',
      'codeContent',
      'message-content',
      'wiki-content',
      'code-arguments-hdr',
      'code-desc',
      'codeHeader',
      'columnLayout',
      'columnMacro',
      'confluenceTable',
      'contentLayout2',
      // 'crayon-font-monospace',
      // 'crayon-main',
      // 'crayon-os-mac',
      // 'crayon-plain-wrap',
      // 'crayon-plain-wrap',
      // 'crayon-syntax',
      // 'crayon-theme-github',
      // 'crayon-wrapped',
      'highlight',
      'lb',
      'markdown-macro',
      'notranslate',
      'plugin_pagetree',
      'print-yes',
      'sectionColumnWrapper',
      'sectionMacro',
      'sectionMacroRow'
    ];

    return node.nodeName === 'DIV'
      && (node.className === '' || node.className.indexOf('crayon') !== -1 ||
        blackListedClasses.some(function (className) {
          return node.classList.contains(className);
        })
      );
  }


  return {
    filter: function (node) {
      return isNodeToDiscard(node);
    },
    replacement: function (innerHTML, node) {
      return node.nodeName === 'DIV' ? '\n' + innerHTML + '\n' : innerHTML;
    }
  };

};
