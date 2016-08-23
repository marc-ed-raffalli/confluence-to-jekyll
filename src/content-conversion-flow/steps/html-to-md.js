'use strict';

var mdConverter = require('../md-converter');

/**
 * Converts the element HTML to MD.
 * Forward the same arguments to the next step replacing contentElt by the matching MD.
 *
 * @param structure
 * @param pageDetails
 * @param destinationDir
 * @param contentElt
 * @param callback
 */
module.exports = function (structure, pageDetails, destinationDir, contentElt, callback) {
  var htmlStr = contentElt.html()
    , md = mdConverter(structure, pageDetails, htmlStr);

  callback(null, structure, pageDetails, destinationDir, md);

};
