export default function (noke) {

    return {

        buildBar(startX, startY, barLength) {
            const BAR_SIZE = noke.options.BAR_SIZE;
            const gGroup = noke._svg.createG('data-group');
            const gBar = noke._svg.createG('bar');
            const rBar = noke._svg.createRect(startX, startY, barLength, BAR_SIZE);

            gGroup.appendChild(gBar);
            gBar.appendChild(rBar);

            return gGroup;
        },

        buildHorizontalMulti() {
            //TODO
        },

        buildHorizontalSingle(startX, startY, width, data) {
            // calculate scale

            data = data[Object.keys(data)[0]];
            const scale = width / (Math.ceil(noke._utilities.maxVal(data) /9) * 10);
            const BAR_GAP = noke.options.BAR_GAP;
            const BAR_SIZE = noke.options.BAR_SIZE;

            const elems =  data.map((val) => {
                const barLength = val*scale;
                const bar = this.buildBar(startX, startY, barLength);
                startY += BAR_SIZE + BAR_GAP;
                return bar;
            });

            const axis = this.buildAxis(startX, startY + BAR_GAP, width);
            elems.push(axis);

            return elems;
        },

        buildVerticalMulti() {
            //TODO
        },

        buildVerticalSingle() {
            //TODO
        },

        buildAxis(startX, startY, width) {
            const TICK_CNT = noke.options.TICK_CNT;
            // TODO support other axis

            // x axis
            const gInfo = noke._svg.createG('data-info');
            const gAxis = noke._axis.x(startX, startY, width, TICK_CNT);
            gInfo.appendChild(gAxis);
            return gInfo;
        },

        createChart(height, width, orientation, data) { 

            const CHART_MARGIN = noke.options.CHART_MARGIN;

            const chart = noke._svg.createSvg(['chart', 'bar-chart']);
            const startX = noke.options.CHART_MARGIN;
            const startY = noke.options.CHART_MARGIN;

            // determine if multi-series
            const isMultiSeries = data.length > 1;
            const seriesClass = isMultiSeries ? 'multi-series' : 'single-series';
            chart.classList.add(seriesClass);

            // determine orientation
            const isHorizontal = (orientation === 'horizontal');
            const orientationClass = isHorizontal ? 'horizontal' : 'vertical';
            chart.classList.add(orientationClass);

            // add viewbox, height, and width attributes
            noke._svg.updateAttribute(chart, 'viewbox', `0 0 ${width} ${height}`);
            noke._svg.updateAttribute(chart, 'height', height);
            noke._svg.updateAttribute(chart, 'width', width);

            // build bars based
            let bars;
            if (isHorizontal && isMultiSeries) {
                bars = this.buildHorizontalMulti();
            } else if (isHorizontal) {
                bars = this.buildHorizontalSingle(startX, startY, width-2*CHART_MARGIN, data);
            } else if (isMultiSeries) {
                bars = this.buildVerticalMulti();
            } else {
                bars = this.buildVerticalSingle();
            }

            // append elements to chart
            bars.forEach((bars) => chart.appendChild(bars));

            return chart;

        }

    };

};
