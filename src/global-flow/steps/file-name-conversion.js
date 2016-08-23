'use strict';

var path = require('path');

/**
 * Updates the pageDetails and set the converted file name
 * Forwards the same arguments to the next step.
 *
 * @param pageStructure
 * @param destinationDir
 * @param callback
 */
module.exports = function (pageStructure, destinationDir, callback) {

  // https://github.com/strongloop/loopback.io/wiki/Conversion-rules#file-names
  pageStructure.files.forEach(function (pageDetails) {
    var fileVersionMatch = pageDetails.baseFileName.match(/(.*)_\d+\..*$/)
      , name = fileVersionMatch ? fileVersionMatch[1] : pageDetails.title
      , destinationFileName = name.replace(/[^a-z0-9\.]+/gi, '-');

    pageDetails.destinationFileName = path.normalize(destinationFileName + '.md');
    pageDetails.destinationFileHtml = path.join(destinationFileName + '.html');
    pageDetails.destinationFileLink = path.join('/doc', 'en', 'lb2', destinationFileName + '.html');
    pageDetails.destinationFilePath = path.join(destinationDir, 'pages', 'en', 'lb2', pageDetails.destinationFileName);
  });

  callback(null, pageStructure, destinationDir);
};
