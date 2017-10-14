'use strict';

var MagicString = require('magic-string');

module.exports = function (options = {}) {
  return {
    transformBundle (code) {
      var pattern = /\/\/.*\n/g;
      var headerIndex;
      var headerExtent;
      var header = '';
      var match;
      while ((match = pattern.exec(code))) {
        if (headerIndex === undefined) {
          headerIndex = match.index;
        }
        var line = match[0];
        headerExtent = match.index + line.length;
        header += line;
        var remaining = code.slice(match.index + line.length);
        if (!(/^\n?\/\//.test(remaining))) {
          break;
        }
        if (/^\n/.test(remaining)) {
          header += '\n';
        }
      }
      var magicString = new MagicString(code);
      magicString.overwrite(headerIndex, headerExtent + 1, '');
      magicString.prepend(header + '\n')
      var result = {code: magicString.toString()};
      if (options.sourceMap !== false && options.sourcemap !== false) {
        result.map = magicString.generateMap({hires: true});
      }
      return result;
    },
  };
};
