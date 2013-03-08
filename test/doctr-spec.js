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

  it('strips doctype and unnecessary tags from valid HTML string with CSS classes', function() {
    expect(doctr('<!DOCTYPE html><html class="ie7"><head><title>Test</head><body class="ie7"><div>Test</div></body></html>'))
      .toBe('<div>Test</div>');
  });

  it('strips unnecessary tags from valid HTML string with uppercase-only coding style', function() {
    expect(doctr('<HTML><HEAD><TITLE>Test!</TITLE></HEAD><BODY><DIV>Test</DIV></BODY></HTML>'))
      .toBe('<DIV>Test</DIV>');
  });

  it('strips doctype and unnecessary tags from valid HTML string with multiline syntax', function() {
    expect(doctr('<html \
      class="ie7"><head><title>Test \
      </title></head><body><div>Test</div></body></html>')).toBe('<div>Test</div>');
  });

  it('doesn\'t strip anything if the input is a valid HTML fragment', function() {
    expect(doctr('Test<br /><div>Test</div>')).toBe('Test<br /><div>Test</div>');
  });

  it('strips unnecessary html structure including empty head element edge case from valid HTML string', function() {
    expect(doctr('<html><head /><body><div>Test</div></body></html>')).toBe('<div>Test</div>');
  });

  it('strips unnecessary html structure based on optionally provided stripping rules', function() {
    expect(doctr('<html><head /><body><nav>Test</nav><div>Test</div></body></html>', {
      '<nav': /<nav(?:.|\n|\r)+?(<\/nav>|\/>)/i
    })).toBe('<div>Test</div>');
  });

});