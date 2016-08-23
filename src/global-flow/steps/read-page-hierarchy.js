'use strict';

/**
 * Extracts the page hierarchy from the index file pointed in parameter.
 * Based from confluence index structure.
 *
 * Calls the callback with the files hierarchy and flat files list
 * {
 *   files:     {Array<PageDetails>},
 *   hierarchy: {PageDetails}
 * }
 *
 * PageDetails:
 * {
 *   title:   {String},       page title as in the index.html,
 *   path:    {String},       path to the page file relative to the provided indexFilePath
 *   parent:  {PageDetails},  parent page details
 * }
 *
 * @param sourceDir
 * @param destinationDir
 * @param callback
 */
module.exports = function (sourceDir, destinationDir, callback) {

  var $ = require('cheerio') // http://cheerio.js.org/
    , path = require('path')

    , fileIO = require('../../utils/file-io')
    , pageStructure = {
      files: [],
      linksMap: {},
      hierarchy: {
        children: []
      }
    }
    ;


  fileIO.read(path.join(sourceDir, 'index.html'), function (err, htmlStr) {
    if (err) {
      return callback(err);
    }

    var doc = $.load(htmlStr);

    recursiveParsePageDetails(doc('.pageSection>ul>li'), pageStructure.hierarchy);

    callback(null, pageStructure, destinationDir);
  });


  function recursiveParsePageDetails(itemElt, parentPage) {
    var link = itemElt.find('>a')
      , baseFileName = link.attr('href')

      , subItems = itemElt.find('>ul>li')

      , pageDetails = {
        title: link.text().replace(/\s+/g, ' '),
        baseFileName: baseFileName,
        path: path.join(sourceDir, baseFileName),
        parent: parentPage
      }
      ;

    pageStructure.linksMap[baseFileName] = pageDetails; // keep a map of links to avoid iterations during search
    pageStructure.files.push(pageDetails);
    parentPage.children.push(pageDetails);

    if (subItems.length !== 0) {
      pageDetails.children = [];

      subItems.each(function () {
        recursiveParsePageDetails($(this), pageDetails);
      });
    }
  }

};
