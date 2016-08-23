'use strict';

var $ = require('cheerio') // http://cheerio.js.org/
  , path = require('path')
  ;

/**
 * Extracts the image location from the content element and copy it to the images folder.
 * Forwards the same arguments to the next step.
 *
 * @param structure
 * @param pageDetails
 * @param destinationDir
 * @param contentElt
 * @param callback
 */
module.exports = function (structure, pageDetails, destinationDir, contentElt, callback) {

  var fileIO = require('../../utils/file-io')
    , pageFileDirName = path.dirname(pageDetails.path);

  contentElt.find('img[src^="attachments/"]')
    .each(function () {
      var imgElt = $(this)
        , src = imgElt.attr('src')
        , fileBaseName = path.basename(src)

      // https://github.com/strongloop/loopback.io/wiki/Conversion-rules
      // move all pictures to the same folder
        , updatedImageSrc = path.join('images', fileBaseName)

        , sourceFilePath = path.join(pageFileDirName, src)
        , destinationFilePath = path.join(destinationDir, updatedImageSrc)
        ;

      fileIO.copyFile(sourceFilePath, destinationFilePath, function (err) {
        if (err) {
          console.error('Failed to copy ', sourceFilePath, destinationFilePath, err);
        }
      });

      // absolute path on template
      imgElt.attr('src', fileBaseName);
    });

  callback(null, structure, pageDetails, destinationDir, contentElt);
};
