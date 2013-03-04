var doctr = require('../index.js');

describe('doctr', function() {

  it('does exist', function() {
    expect(typeof doctr).toEqual('function');
  });

  it('returns an empty string by default', function() {
    expect(doctr()).toBe('');
  });
  
});