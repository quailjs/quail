describe('assessment: aMustHaveTitle', function () {
  var quailResults;

  before(quailTestRunner.setup('http://localhost:9999/aMustHaveTitle/aMustHaveTitle.html', [
    'aMustHaveTitle'
  ]));

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
    expect(this.results.stats.cases).to.equal(1);
    expect(this.results.tests).to.include.keys('aMustHaveTitle');
    expect(this.results.tests);
  });

  it('should return the proper assessment for the tests', function () {
    expect(this.results.tests['aMustHaveTitle'].cases).to.deep.equal([{
      html: "<a href=\"dogs.html\" class=\"quail-failed-element\">information about dogs</a>",
      selector: "a[href=\"dogs.html\"].quail-failed-element",
      status: "failed"
    }]);
  });
});
