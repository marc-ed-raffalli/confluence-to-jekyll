'use strict';

if (process.argv.length === 4) {
  var sourceDir = process.argv[2]
    , destinationDir = process.argv[3]
    ;

  require('./src/global-flow')(sourceDir, destinationDir);
  return;
}

console.log('-------------------------------------');
console.log('Loopback.io content conversion script');
console.log('Requires {PATH_TO_ORIGINAL_CONTENT} {OUTPUT_PATH}');
console.log('see README.md file');
