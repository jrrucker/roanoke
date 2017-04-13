import _barchart from './barchart'
import _svg from './svg';
import _axis from './axis';
import _utilities from './utilities';

const DEFAULTS = {
    CHART_MARGIN: 10,
    BAR_GAP: 10,
    BAR_SIZE: 20,
    TICK_CNT: 10
};

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

window['roanoke'] = function (options = {}) {
    const self = this;

    const keys = Object.keys(options);
    self.options = DEFAULTS;

    keys.forEach((key) => {
        self.options[key] = options[key];
    }); 

    // Public API

    self.set = (key, value) => {
        options[key] = value;
        return self;
    };

    // Private API

    self._utilities = _utilities;
    self._svg = _svg;
    self._axis= _axis(self);

    self._barchart = _barchart(self);

    self['draw'] = function () {
        const container = document.getElementById(options['container']);
        const data = options['data'];

        // calculate height
        let height = options['height'];
        if (!height) {
            //TODO should handle multiseries
            const seriesData = data[Object.keys(data)[0]];
            height = self.options.CHART_MARGIN*2 + seriesData.length*(self.options.BAR_GAP+self.options.BAR_SIZE) - self.options.BAR_GAP + 3*self.options.CHART_MARGIN;
        }

        // calulate width
        let width = options['width'];
        if (!width) {
            width = Math.ceil(self._utilities.maxVal(data) / 8) * 10;
        }

        // create chart
        const chart = self._barchart.createChart(height, width, 'horizontal', data);

        // append chart to dom container
        container.appendChild(chart);
    };

    return self;
};
