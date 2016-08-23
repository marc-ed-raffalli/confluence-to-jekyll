'use strict';

var codeBeautify = require('js-beautify');

module.exports = {
    /**
     * Beautifies the HTML of the provided node.
     * Removes class and style for table related nodes.
     * 
     * @param node
     * @returns {string}
     */
    html: function (node) {
      Array.from(node.querySelectorAll('th,td,tr'))
      .forEach(function (node) {

        // remove useless colspan
        if ((node.tagName === 'TD' || node.tagName === 'TH' ) && node.colSpan == '1') {
          node.removeAttribute('colspan');
        }

        node.removeAttribute('class');
        node.removeAttribute('style');
      });

    if (node.tagName === 'TABLE') {
      node.removeAttribute('class');
    }

    var html = codeBeautify.html(node.outerHTML, {
      indent_size: 2
    });

    return '\n\n' + html + '\n\n';
  },

  js: function (str) {
    return codeBeautify.js_beautify(str, {
      indent_size: 2
    });
  }

};
