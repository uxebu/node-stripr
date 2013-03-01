var doctr = require('../index.js'),
    fs = require('fs'),
    path = require('path'),
    http = require('http');

describe('doctr', function() {

  it('does exist', function() {
    expect(typeof doctr).toEqual('object');
  });

  // internal implementation detail, don't care about it?
  it('generates correct jsdoc from specified input to `tmp/jsdoc`', function() {

    var mockFile = fs.readFileSync(path.join(__dirname, 'jsdoctest.html'));

    var config = {
      jsFolder: path.join(__dirname, 'jsdoctest.js'),
      callback: function() {

        var generatedFile = fs.readFileSync(path.join(__dirname, 'tmp/jsdoc/jsdoctest.html'));
        expect(generatedFile.toString()).toBe(mockFile.toString());

      }
    };

    doctr.generateJsdoc(config);
    // TODO: cleanup.

  });

  it('strips unnecessary html-header from generated jsdoc file in `tmp/jsdoc`', function() {
    var mockFile = fs.readFileSync(path.join(__dirname, 'jsdoctest.md'));
    var filename = path.join(__dirname, 'jsdoctest.html');

    expect(doctr.getStrippedContent(filename)).toBe(mockFile.toString());

  });

  it('renames file to .md after stripping html-header', function() {
    var filename = path.join(__dirname, 'jsdoctest2.html');
    doctr.stripJsdocHeader(filename);

    expect(fs.existsSync(path.join(__dirname, 'jsdoctest2.md'))).toBeTruthy();

  });

  it('creates a folder <folderName> for the generated html doc', function() {
    var config = {
      // config values
    };

    doctr.run(config);
    expect(fs.existsSync(config.outputFolder)).toBeTruthy();
  });

  it('makes <folderName> folder available on a webserver', function(done) {
    var config = {
      // config values
    };

    doctr.run(config);

    http.get('http://localhost:8000/' + config.webFolder, function(response) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

});