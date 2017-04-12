import _svg from './svg';
import _axis from './axis';

const CHART_MARGIN = 10;
const BAR_GAP = 10;
const BAR_SIZE = 20;
const TICK_CNT = 10;

function maxVal (values) {
    let max;
    values.forEach((val) => {
        if (val > max || !max) {
            max = val;
        }
    });
    return max;
}

function buildBar(startX, startY, barLength) {
    const gGroup = _svg.g('data-group');
    const gBar = _svg.g('bar');
    const rBar = _svg.rect(startX, startY, barLength, BAR_SIZE);

    gGroup.appendChild(gBar);
    gBar.appendChild(rBar);

    return gGroup;
}

function buildHorizontalMulti() {
    //TODO
}

function buildHorizontalSingle(startX, startY, width, data) {
    // calculate scale

    data = data[Object.keys(data)[0]];
    const scale = width / (Math.ceil(maxVal(data) /9) * 10);

    const elems =  data.map((val) => {
        const barLength = val*scale;
        const bar = buildBar(startX, startY, barLength);
        startY += BAR_SIZE + BAR_GAP;
        return bar;
    });

    const axis = buildAxis(startX, startY + BAR_GAP, width);
    elems.push(axis);

    return elems;
}

function buildVerticalMulti() {
    //TODO
}

function buildVerticalSingle() {
    //TODO
}

function buildAxis(startX, startY, width) {
    // TODO support other axis

    // x axis
    const gInfo = _svg.g('data-info');
    const gAxis = _axis.x(startX, startY, width, TICK_CNT);
    gInfo.appendChild(gAxis);
    return gInfo;
}

export default function (height, width, orientation, data) {

    const chart = _svg.svg(['chart', 'bar-chart']);
    const startX = CHART_MARGIN;
    const startY = CHART_MARGIN;

    // determine if multi-series
    const isMultiSeries = data.length > 1;
    const seriesClass = isMultiSeries ? 'multi-series' : 'single-series';
    chart.classList.add(seriesClass);

    // determine orientation
    const isHorizontal = (orientation === 'horizontal');
    const orientationClass = isHorizontal ? 'horizontal' : 'vertical';
    chart.classList.add(orientationClass);

    // add viewbox, height, and width attributes
    _svg.addAttribute(chart, 'viewbox', `0 0 ${width} ${height}`);
    _svg.addAttribute(chart, 'height', height);
    _svg.addAttribute(chart, 'width', width);

    // build bars based
    let bars;
    if (isHorizontal && isMultiSeries) {
        bars = buildHorizontalMulti();
    } else if (isHorizontal) {
        bars = buildHorizontalSingle(startX, startY, width-2*CHART_MARGIN, data);
    } else if (isMultiSeries) {
        bars = buildVerticalMulti();
    } else {
        bars = buildVerticalSingle();
    }

    // append elements to chart
    bars.forEach((bars) => chart.appendChild(bars));


    return chart;

};
