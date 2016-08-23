'use strict';

var async = require('async');

/**
 * Conversion flow for the HTML file to MD.
 *
 * @param structure       Complete page <PageDetails> hierarchy
 * @param pageDetails     Page being processed by the flow
 * @param destinationDir  Destination directory where the converted content should be written
 * @param callback
 */
module.exports = function (structure, pageDetails, destinationDir, callback) {
  async.waterfall([
    async.constant(structure, pageDetails, destinationDir)
    , require('./steps/read-content')

    , require('./steps/attachments-migration') // copy images over
    , require('./steps/html-to-md')
    , require('./steps/front-matter')

    , require('./steps/write-converted-content')
  ], callback);
};
