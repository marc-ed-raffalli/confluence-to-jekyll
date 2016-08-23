'use strict';

module.exports = function (sourceDir, destinationDir) {

  var async = require('async');

  async.waterfall([
    async.constant(sourceDir, destinationDir)

    , require('./steps/read-page-hierarchy')
    , require('./steps/file-name-conversion')       // change file names before processing the content to update the internal links
    , require('./steps/file-content-conversion')    // process each pages with the conversion flow
    , require('./steps/side-menu')                  // output the side menu with updated file location

  ], function (err, result) {
    console.log('Done', err);
  });

};
