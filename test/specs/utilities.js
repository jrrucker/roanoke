describe ('Generic Utilities', function () {

    var chart;

    beforeEach(function () {
        chart = new roanoke();
    });

    it ('will find the maximum value in an array', function () {
        var values = [1,51,23,55,55,33.2,2];
        expect(chart._utilities.maxVal(values)).to.be(55);
    });

});
