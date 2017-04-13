export default function (noke)  {

    return {

        x(startX, startY, width, ticks) {
            const gAxis = noke._svg.createG(['axis', 'x']);
            const rAxis = noke._svg.createRect(startX, startY, width, 1);
            gAxis.appendChild(rAxis);

            let tickCnt = ticks;
            while (tickCnt-- >= 0) {
                const rTick = noke._svg.createRect(startX, startY, 1, 10);
                startX += width / ticks;
                gAxis.appendChild(rTick);
            }

            return gAxis;
        },

        y() {
            //TODO
        }
    }

};
