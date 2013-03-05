var doctr = require('../index.js');

describe('doctr', function() {

  it('does exist', function() {
    expect(typeof doctr).toEqual('function');
  });

  it('returns an empty string by default', function() {
    expect(doctr()).toBe('');
  });

  it('strips unnecessary html structure from valid HTML string', function() {
    expect(doctr('<html><head><title>Test</head><body><div>Test</div></body></html>'))
      .toBe('<div>Test</div>');
  });

  it('strips doctype from HTML string if existent', function() {
    expect(doctr('<!DOCTYPE html><div>Test</div>')).toBe('<div>Test</div>');
  });

});