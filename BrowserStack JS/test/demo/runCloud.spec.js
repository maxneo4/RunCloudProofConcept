describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000/');

    expect(element(by.tagName('h1')).getText()).toEqual('Browser');
  });
});
