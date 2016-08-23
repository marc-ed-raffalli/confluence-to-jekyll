/*global describe, before, after, beforeEach, afterEach, it, expect */
'use strict';

describe('A tags', function () {

  var expect = require('chai').expect
    , baseLBDocsUrl = 'https://docs.strongloop.com/display/LB/'
    , aTagConverter = require('../../src/content-conversion-flow/md-converter/converters/a-tag')

    , mockFiles = [
      'file-a'
      , 'file-b'
      , 'file-c'
      , 'file with spaces' // test for confluence titles +
    ]

    , structure = {
      files: mockFiles.map(function (d) {
        return {
          title: d,
          baseFileName: d + '.html',
          destinationFileLink: '/pages/en/' + d + '.html'
        };
      }),
      linksMap: {}
    }
    , nodeMock
    , dummyText = 'lorem'
    , dummyLink = 'http://some.link/'
    , hash = '#foo'
    , converter
    ;

  structure.files.forEach(function (f) {
    structure.linksMap[f.baseFileName] = f;
  });

  beforeEach(function () {
    converter = aTagConverter(undefined, structure, {});
    nodeMock = {
      textContent: dummyText,
      href: dummyLink
    };
  });

  function test(innerTxt, node, expectedTxt, expectedLink) {
    expect(converter.replacement(innerTxt, node)).to.equal(['[', expectedTxt, '](', expectedLink, ')'].join(''));
  }

  it('should convert link', function () {
    test(dummyText, nodeMock, dummyText, dummyLink);
  });

  it('should convert link with hash', function () {
    nodeMock.href = 'http://some.link/' + hash;
    test(dummyText, nodeMock, dummyText, dummyLink + hash);
  });

  it('should convert relative doc link', function () {
    nodeMock.href = mockFiles[0] + '.html';
    test(dummyText, nodeMock, dummyText, structure.linksMap[mockFiles[0] + '.html'].destinationFileLink);
  });

  it('should convert relative doc link with hash', function () {
    nodeMock.href = mockFiles[0] + '.html' + hash;
    test(dummyText, nodeMock, dummyText, structure.linksMap[mockFiles[0] + '.html'].destinationFileLink + hash);
  });

  it('should convert links pointing to confluence', function () {
    nodeMock.href = baseLBDocsUrl + mockFiles[0];
    test(dummyText, nodeMock, dummyText, structure.linksMap[mockFiles[0] + '.html'].destinationFileLink);
  });

  it('should convert links with spaces pointing to confluence', function () {
    nodeMock.href = baseLBDocsUrl + mockFiles[3].replace(/ /g, '+');
    test(dummyText, nodeMock, dummyText, structure.linksMap[mockFiles[3] + '.html'].destinationFileLink);
  });

  it('should convert links with spaces pointing to confluence with hash', function () {
    nodeMock.href = baseLBDocsUrl + mockFiles[3].replace(/ /g, '+')+ hash;
    test(dummyText, nodeMock, dummyText, structure.linksMap[mockFiles[3] + '.html'].destinationFileLink+ hash);
  });

});
