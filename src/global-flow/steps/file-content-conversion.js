'use strict';

module.exports = function (structure, destinationDir, callback) {

  var async = require('async')
    , contentConversionFlow = require('../../content-conversion-flow');

  async.parallel(
    structure.files.map(function (pageDetails) {
      return function (callback) {
        // Any update to pageDetails will impact the structure.
        // The side menu generation following this step will need the updated page details in the structure
        contentConversionFlow(structure, pageDetails, destinationDir, callback);
      };
    }),
    function (err) {
      if (err) {
        return callback(err);
      }

      callback(null, structure, destinationDir);
    });

};
