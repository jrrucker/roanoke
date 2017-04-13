export default {

    maxVal(values) {
        let max;
        values.forEach((val) => {
            if (val > max || !max) {
                max = val;
            }
        });
        return max;
    }

};
