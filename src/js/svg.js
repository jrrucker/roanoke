const SVG_NS = 'http://www.w3.org/2000/svg';

export default {

    createSvg(clsArr) {
        const svg = document.createElementNS(SVG_NS, 'svg');

        if (clsArr) {
            clsArr.forEach(cls => svg.classList.add(cls));
        }

        svg.setAttributeNS(null, 'role', 'img');
        return svg;
    },

    createG(clsArr) {
        const g = document.createElementNS(SVG_NS, 'g');
        if (Array.isArray(clsArr)) {
            clsArr.forEach(cls => g.classList.add(cls));
        } else if (clsArr) {
            g.classList.add(clsArr);
        }
        return g;
    },

    createRect(x, y, width, height) {
        const rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'width', width);
        rect.setAttributeNS(null, 'height', height);
        return rect;
    },

    updateAttribute(elem, attr, val) {
        elem.setAttributeNS(null, attr, val);
    }

};
