describe('The form test', function () {
  before(h.setup('http://quailpages/forms/simple-form.html'));

  it('should have a client', function () {
    expect(this.client).to.exist;
  });

  it('should have results', function () {
    expect(this.results).to.exist;
  });

  it('should have tests', function () {
    expect(this.results.stats.tests).to.equal(1);
  });

  it('should have cases', function () {
    expect(this.results.stats.cases).to.equal(2);
  });
});
