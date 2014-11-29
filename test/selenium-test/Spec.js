describe('The driver', function () {
  before(h.setup('http://quailpages/forms/simple-form.html'));

  it('exists', function (done) {
    expect(this.client).to.exist;

    this
      .client
      .getHTML('html', function (err, html) {
        assert.equal(err, null);
        html.should.be.exactly('<html webdriver=\"true\"><head>\n  <title>Simple form</title>\n</head>\n<body>\n\n  <form>\n    <input type=\"text\">\n    <input type=\"text\">\n    <input type=\"submit\">\n  </form>\n\n\n\n</body></html>');
      })
      .call(done);
  });
});
