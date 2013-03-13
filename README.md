# node-stripr

Node.js Script for stripping content

## Installation

~~~bash
$ npm install node-stripr
~~~

## Usage Example

~~~js
var stripr = require('node-stripr');

var strippedContent = stripr('<html><head><title>Test</title></head><body>Hello World</body></html>');
// strippedContent = 'Hello World'

// You can also add custom stripping rules:

var customStrippingRules = {
  // key: identifier<string>, value: stripping regex<regex>
  // e.g. strip a footer
  '<footer': /<footer(?:.|\n|\r)+?(<\/footer>|\/>)/i
};

stripr('<html><head><title>Test</title></head><body>Hello World<footer>No way</footer></body></html>', customStrippingRules);
// returns 'Hello World' again ;)
~~~