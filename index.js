var allowedInputTypes = ['number', 'string'];

module.exports = function() {

  if (arguments.length == 0 || allowedInputTypes.indexOf(typeof arguments[0]) == -1) {
    return '';
  }

  var input = arguments[0],
      inputLower = input.toLowerCase(),
      options = arguments[1] || {},
      output = input;

  var stripRegexes = {
    '<!doctype': /<!doctype((.|\n|\r)*?)>/i,
    '<html': /<html((.|\n|\r)*?)>/i,
    '<head': /(<head(.|\n|\r)*<\/head>|<head(.)*\/>)/i,
    '<body': /<body((.|\n|\r)*?)>/i,
    '</body>': /<\/body>/i,
    '</html>': /<\/html>/i
  };

  // merge stripRegexes with additionaly provided rules
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
        stripRegexes[key] = options[key];
    }
  }

  for (var key in stripRegexes) {
    if (stripRegexes.hasOwnProperty(key)) {

      // check if keys have a match in input and strip away using the regexes
      if (inputLower.indexOf(key.toLowerCase()) > -1) {
        output = output.replace(stripRegexes[key], '');
      }
    }
  }

  return output;

};