describe ('SVG Utilities', function () {

    var chart;

    beforeEach(function () {
        chart = new roanoke();
    });

    it ('will generate an svg object without any classes', function () {
        var element = chart._svg.createSvg();
        expect(element.classList.length).to.be(0);
    });

    it ('will generate an svg object with provided classes', function () {
        var element = chart._svg.createSvg(['richmond', 'lynchburg']);
        expect(element.classList.length).to.be(2);
        expect(element.classList.contains('richmond')).to.be.ok();
        expect(element.classList.contains('lynchburg')).to.be.ok();
    });

    it ('will generate a group object without any classes', function () {
        var element = chart._svg.createG();
        expect(element.classList.length).to.be(0);
    });

    it ('will generate a group object with provided classes', function () {
        var element = chart._svg.createG(['richmond', 'lynchburg']);
        expect(element.classList.length).to.be(2);
        expect(element.classList.contains('richmond')).to.be.ok();
        expect(element.classList.contains('lynchburg')).to.be.ok();
    });

    it ('will generate a rectange object with attributes', function () {
        var element = chart._svg.createRect(5, 10, 15, 20);
        expect(element.x.baseVal.value).to.be(5);
        expect(element.y.baseVal.value).to.be(10);
        expect(element.width.baseVal.value).to.be(15);
        expect(element.height.baseVal.value).to.be(20);
    });

    it ('will add attibutes to existing elements ad hoc', function () {
        var element = chart._svg.createSvg();
        chart._svg.updateAttribute(element, 'fairfax', 'norfolk');
        expect(element.getAttributeNS(null, 'fairfax')).to.be('norfolk');
    });

});
