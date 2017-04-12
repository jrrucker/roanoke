import _svg from './svg';

export default  {

    x(startX, startY, width, ticks) {
        const gAxis = _svg.g(['axis', 'x']);
        const rAxis = _svg.rect(startX, startY, width, 1);
        gAxis.appendChild(rAxis);

        let tickCnt = ticks;
        while (tickCnt-- >= 0) {
            const rTick = _svg.rect(startX, startY, 1, 10);
            startX += width / ticks;
            gAxis.appendChild(rTick);
        }

        return gAxis;
    },

    y() {
        //TODO
    }

};
