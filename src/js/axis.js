import svg from './svg';

const Axis = {

    x(startX, startY, width, ticks) {
        const gAxis = svg.g(['axis', 'x']);
        const rAxis = svg.rect(startX, startY, width, 1);
        gAxis.appendChild(rAxis);

        let tickCnt = ticks;
        while (tickCnt-- >= 0) {
            const rTick = svg.rect(startX, startY, 1, 10);
            startX += width / ticks;
            gAxis.appendChild(rTick);
        }

        return gAxis; 
    },

    y() {
        //TODO
    } 

};

export default Axis;
