'use strict';

var codeBeautifier = require('../../../utils/code-beautifier')
  , esprima = require('esprima')
  , isJSON = require('is-json');

/**
 * Converters for code blocks, pre, code and others.
 * Detects JS and beautifies the output.
 *
 * @param mdConverter
 * @param structure
 * @param pageDetails
 */
module.exports = function (mdConverter, structure, pageDetails) {

  function multiLineCodeBlock(code, node) {
    // cleans out java or bash macros tagged as js
    var lg = node.className.indexOf('jscript') !== -1 ? 'js' : '';

    if (code.indexOf('@Override') !== -1) {
      // used a lot in Java code snippet
      lg = '';
    }
    // '{' + code + '}' is a quick fix for JSON documented with attribute only  
    else if (!isJSON(code) && !isJSON('{' + code + '}')) {
      try {
        esprima.parse(code);
        lg = 'js';
      }
      catch (e) {
        // neither json or js
        if (lg === 'js') {
          console.log('Found invalid JSON/JS code tagged as js in file', pageDetails.baseFileName);
        }
        lg = '';
      }
    }
    else {
      lg = 'js';
    }

    if (lg === 'js') {
      code = codeBeautifier.js(code);
    }

    return [
      '```' + lg,
      code.trim(),
      '```'
    ].join('\n');
  }


  return {
    filter: function (node) {
      var tagName = node.tagName,
        styles = node.getAttribute('style');

      return tagName === 'PRE' ||
        tagName === 'CODE' ||
        (styles && styles.indexOf('font-family: Courier New; white-space:pre;') !== -1); // code not in regular confluence code macro
    },
    replacement: function (innerHTML, node) {

      if (node.tagName === 'CODE') {
        var nestedLink = node.querySelector('a');
        // case where link is wrapped in a code tag
        if (nestedLink) {
          var linkStr = mdConverter(structure, pageDetails, node.innerHTML);

          return linkStr.replace(/\[(.+)]/gi, '[`$1`]');     // put the ` inside the link
        }
      }

      var nestedCode = node.querySelector('code');

      if (node.tagName === 'PRE' && nestedCode) {
        // when pre has a direct child a code element, return the md of the code tag
        return innerHTML;
      }

      if (innerHTML.indexOf('\n') === -1) {  // inline code
        return '`' + innerHTML + '`';
      }

      return multiLineCodeBlock(innerHTML, node);
    }
  };
};
