'use strict';

var yamlJs = require('yamljs')    // https://tonicdev.com/npm/yamljs
  , path = require('path')
  , fileIO = require('../../utils/file-io');

/**
 * Writes the side menu and forward the arguments to the next step
 * @param structure
 * @param destinationDir
 * @param callback
 */
module.exports = function (structure, destinationDir, callback) {

  var sideMenuEntries = structure.hierarchy.children[0].children.map(recursiveAppEntries)
    , sideMenu = {
      entries: [{
        title: 'sidebar',
        product: 'LoopBack',
        version: '2.0',
        folders: sideMenuEntries
      }]
    }
    , sideMenuYml = yamlJs.stringify(sideMenu, 1000000, 2)     // big number to prevent inline syntax
    , sideMenuFilePath = path.join(destinationDir, '_data', 'sidebars', 'lb2_sidebar.yml')
    ;

  fileIO.write(sideMenuFilePath, sideMenuYml, function (err) {
    if (err) {
      return callback(err);
    }

    callback(null, structure, destinationDir);
  });

  function recursiveAppEntries(pageDetails) {

    var entry = buildEntry(pageDetails);
    if (pageDetails.children) {
      entry.folderitems = pageDetails.children.map(recursiveAppEntries);
    }

    return entry;
  }

  function buildEntry(pageDetails) {
    return {
      title: pageDetails.title,
      url: pageDetails.destinationFileLink,
      output: 'web, pdf'
    };
  }

};
