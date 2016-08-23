'use strict';

var
  fs = require('fs')
  , path = require('path')
  , mkdirp = require('mkdirp')
  ;

/**
 * Quick utility for file IO.
 * @type {{read: read, copyFile: copyFile, write: write}}
 */
module.exports = {
  read: read,
  copyFile: copyFile,
  write: write
};


function read(filePath, callback) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }

    callback(null, data);
  });
}

function write(filePath, data, callback) {
  var dirName = path.dirname(filePath);

  mkdirp(dirName, function (err) {
    if (err) {
      return callback(err);
    }

    fs.writeFile(filePath, data, function (err) {
      if (err) {
        return callback(err);
      }

      callback();
    });
  });
}


function copyFile(source, target, cb) {
  fs.lstat(target, function (err, stats) {
    var cbCalled = false;

    function done(err) {
      if (!cbCalled) {
        cb(err);
        cbCalled = true;
      }
    }

    if (!err && stats.isFile()) {
      console.log(target, 'exists already');
      return cb(null);
    }

    mkdirp(path.dirname(target), function (err) {
      if (err) {
        return cb(err);
      }

      var rd = fs.createReadStream(source)
        , wr = fs.createWriteStream(target);

      rd.on('error', done);
      wr.on('error', done);
      wr.on('close', function (ex) {
        console.log(target, 'created');
        done();
      });

      rd.pipe(wr);
    });
  });
}
