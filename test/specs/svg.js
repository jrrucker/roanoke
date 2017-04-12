describe ('SVG Utilities', function () {

    var chart;

    beforeEach(function () {
        chart = new roanoke();
    });

    it ('will generate an svg object without any classes', function () {
        var element = chart.svg.svg();
        expect(element.classList.length).to.be(0);
    });

    it ('will generate an svg object with provided classes', function () {
        var element = chart.svg.svg(['richmond', 'lynchburg']);
        expect(element.classList.length).to.be(2);
        expect(element.classList.contains('richmond')).to.be.ok();
        expect(element.classList.contains('lynchburg')).to.be.ok();
    });

});
