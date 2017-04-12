import _barchart from './barchart'
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

window['roanoke'] = function (options) {
    const self = this;

    self['svg'] = _svg;
    self['axis'] = _axis;
    self['barchart'] = _barchart;

    // options
    // - type
    // - themes
    // - width
    // - height
    // - aspect?
    // - axis
    // - ticks
    // - legend key
    // - container

    self['draw'] = function () {
        const container = document.getElementById(options['container']);
        const data = options['data'];

        // calculate height
        let height = options['height'];
        if (!height) {
            //TODO should handle multiseries
            const seriesData = data[Object.keys(data)[0]];
            height = CHART_MARGIN*2 + seriesData.length*(BAR_GAP+BAR_SIZE) - BAR_GAP + 3*CHART_MARGIN;
        }

        // calulate width
        let width = options['width'];
        if (!width) {
            width = Math.ceil(maxVal(data) / 8) * 10;
        }

        // create chart
        const chart = _barchart(height, width, 'horizontal', data);

        // append chart to dom container
        container.appendChild(chart);
    };

    return self;
};
