var stripr = require('../index.js'),
    fs = require('fs');

describe('stripr', function() {

  it('does exist', function() {
    expect(typeof stripr).toEqual('function');
  });

  it('returns an empty string by default', function() {
    expect(stripr()).toBe('');
  });

  it('strips unnecessary html structure from valid HTML string', function() {
    expect(stripr('<html><head><title>Test</head><body><div>Test</div></body></html>'))
      .toBe('<div>Test</div>');
  });

  it('strips doctype from HTML string if existent', function() {
    expect(stripr('<!DOCTYPE html><div>Test</div>')).toBe('<div>Test</div>');
  });

  it('strips doctype and unnecessary tags from valid HTML string with CSS classes', function() {
    expect(stripr('<!DOCTYPE html><html class="ie7"><head><title>Test</head><body class="ie7"><div>Test</div></body></html>'))
      .toBe('<div>Test</div>');
  });

  it('strips unnecessary tags from valid HTML string with uppercase-only coding style', function() {
    expect(stripr('<HTML><HEAD><TITLE>Test!</TITLE></HEAD><BODY><DIV>Test</DIV></BODY></HTML>'))
      .toBe('<DIV>Test</DIV>');
  });

  it('strips doctype and unnecessary tags from valid HTML string with multiline syntax', function() {
    expect(stripr('<html \
      class="ie7"><head><title>Test \
      </title></head><body><div>Test</div></body></html>')).toBe('<div>Test</div>');
  });

  it('doesn\'t strip anything if the input is a valid HTML fragment', function() {
    expect(stripr('Test<br /><div>Test</div>')).toBe('Test<br /><div>Test</div>');
  });

  it('strips unnecessary html structure including empty head element edge case from valid HTML string', function() {
    expect(stripr('<html><head /><body><div>Test</div></body></html>')).toBe('<div>Test</div>');
  });

  it('strips unnecessary html structure based on optionally provided stripping rules', function() {
    expect(stripr('<html><head /><body><nav>Test</nav><div>Test</div></body></html>', {
      '<nav': /<nav(?:.|\n|\r)+?(<\/nav>|\/>)/i
    })).toBe('<div>Test</div>');
  });

  it('strips unnecessary html structure from a test-file based on optionally provided stripping rules', function() {
    expect(stripr(fs.readFileSync('test/test.html').toString(), {
      '<!-- Generated': /<!(.|\n|\r)*<\/h2><a name="JIRA_Report"><\/a>/i
    })).toBe('<table>Test</table>');
  });

});