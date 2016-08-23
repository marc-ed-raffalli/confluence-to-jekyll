'use strict';

var fileIO = require('../../utils/file-io');

module.exports = function (structure, pageDetails, destinationDir, md, callback) {

  fileIO.write(pageDetails.destinationFilePath, md, function (err) {
    if (err) {
      return callback(err);
    }

    console.log('Processed page', pageDetails.title);
    callback(null);
  });

};
