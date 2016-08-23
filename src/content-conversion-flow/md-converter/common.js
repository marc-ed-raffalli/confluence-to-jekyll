'use strict';

/**
 * Conversion utility class
 */
module.exports = {

  /**
   * Converts the href of the provided node to the new file location.
   *
   * @param structure
   * @param pageDetails
   * @param node
   */
  convertLink: function (structure, pageDetails, node) {
    var baseLBDocsUrl = 'https://docs.strongloop.com/display/LB/'
      , urlParts = node.href.split('#')
      , url = urlParts[0]
      ;

    // some pages don't have the link correctly exported
    // it would still point to the confluence URL
    if (node.href.indexOf(baseLBDocsUrl) === 0) {
      var pageTitle = url.substr(baseLBDocsUrl.length).replace(/\+/g, ' '),
        page = structure.files.find(function (pageDetails) {
          return pageDetails.title === pageTitle;
        });

      if (page === undefined) {
        console.log('Could not match docs link', '"' + node.textContent + '"', node.href, 'in file', pageDetails.baseFileName);
      }
      else {
        // page identified, set the name it would have as exported
        // to continue the export
        url = page.baseFileName;
      }
    }

    // the linksMap maps the original file name to the new
    if (structure.linksMap[url] !== undefined) {
      var hash = urlParts[1];
      node.href = structure.linksMap[url].destinationFileLink + (hash !== undefined ? '#' + hash : '');
    }
  }

};
