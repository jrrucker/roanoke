describe ('Axis Utilities', function () {

    var chart;

    beforeEach(function () {
        chart = new roanoke();
    });

    it ('will build an horizontal axis with appropriate classes', function () {
        var axis = chart._axis.x(0, 0, 500, 10);
        expect(axis.classList.contains('axis')).to.be.ok();
        expect(axis.classList.contains('x')).to.be.ok();
    });

    it ('will create rectangle objects for the axis and ticks', function () {
        var axis = chart._axis.x(0, 0, 400, 4);
        expect(axis.childNodes.length).to.be(6);

        expect(axis.childNodes[0].getAttributeNS(null, 'x')).to.be('0');
        expect(axis.childNodes[0].getAttributeNS(null, 'y')).to.be('0');
        expect(axis.childNodes[0].getAttributeNS(null, 'width')).to.be('400');
        expect(axis.childNodes[0].getAttributeNS(null, 'height')).to.be('1');

        expect(axis.childNodes[1].getAttributeNS(null, 'x')).to.be('0');
        expect(axis.childNodes[1].getAttributeNS(null, 'y')).to.be('0');
        expect(axis.childNodes[1].getAttributeNS(null, 'width')).to.be('1');
        expect(axis.childNodes[1].getAttributeNS(null, 'height')).to.be('10');

        expect(axis.childNodes[2].getAttributeNS(null, 'x')).to.be('100');
        expect(axis.childNodes[2].getAttributeNS(null, 'y')).to.be('0');
        expect(axis.childNodes[2].getAttributeNS(null, 'width')).to.be('1');
        expect(axis.childNodes[2].getAttributeNS(null, 'height')).to.be('10');

        expect(axis.childNodes[3].getAttributeNS(null, 'x')).to.be('200');
        expect(axis.childNodes[3].getAttributeNS(null, 'y')).to.be('0');
        expect(axis.childNodes[3].getAttributeNS(null, 'width')).to.be('1');
        expect(axis.childNodes[3].getAttributeNS(null, 'height')).to.be('10');

        expect(axis.childNodes[4].getAttributeNS(null, 'x')).to.be('300');
        expect(axis.childNodes[4].getAttributeNS(null, 'y')).to.be('0');
        expect(axis.childNodes[4].getAttributeNS(null, 'width')).to.be('1');
        expect(axis.childNodes[4].getAttributeNS(null, 'height')).to.be('10');

        expect(axis.childNodes[5].getAttributeNS(null, 'x')).to.be('400');
        expect(axis.childNodes[5].getAttributeNS(null, 'y')).to.be('0');
        expect(axis.childNodes[5].getAttributeNS(null, 'width')).to.be('1');
        expect(axis.childNodes[5].getAttributeNS(null, 'height')).to.be('10');
    });

});
