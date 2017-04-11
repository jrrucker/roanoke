import SVG from '../../js/svg';

const assert = require('assert');

describe ('SVG Utilities', () => {

    it ('will generate an svg object without any classes', () => {
        const element = SVG.svg();
        assert.equal(element.classList.length, 0);
    });

    it ('will generate an svg object with provided classes', () => {
    	const element = SVG.svg(['richmond', 'lynchburg']);
    	assert.equal(element.classList.length, 2);
    	assert.equal(element.classList.contains('richmond'), true);
    	assert.equal(element.classList.contains('lynchburg'), true);
    });

});
