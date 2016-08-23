'use strict';

var $ = require('cheerio') // http://cheerio.js.org/
  ;

/**
 * Reads the file pointed by the pageDetails.path
 * forwards the arguments to the next step adding the content element
 *
 * @param structure
 * @param pageDetails
 * @param destinationDir
 * @param callback
 */
module.exports = function (structure, pageDetails, destinationDir, callback) {

  var fileIO = require('../../utils/file-io');

  fileIO.read(pageDetails.path, function (err, htmlStr) {
    if (err) {
      return callback(err);
    }

    var doc = $.load(htmlStr);

    // see https://github.com/strongloop/loopback.io/wiki/Conversion-rules
    // keep only the #main-content content
    callback(null, structure, pageDetails, destinationDir, doc('#main-content'));
  });

};
