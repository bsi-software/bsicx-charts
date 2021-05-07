export default class AbstractChartJsChartAdapter {
    /**
     * @returns {string}
     */
    static getType() {
        throw new Error('not implemented');
    }

    /**
     * @param {ChartDataModel} model
     * @returns {string[]}
     */
    extractLabels(model) {
        /**
         * @type {ChartDataAxeModel[]}
         */
        const axes = model.axes || [];
        if (axes.length === 0) {
            throw new Error('no axes defined');
        }
        return axes.pop().labels.map(label => label.label);
    }

    /**
     * @param {ChartDataModel} model
     * @returns {{}[]}
     */
    extractDatasets(model) {
        /**
         * @type {ChartDataDatasetModel[]}
         */
        const datasets = model.data || [];
        return datasets.map(dataset => {
            return {
                label: dataset.label,
                data: dataset.values.map(value => this._extractValueFromValueModel(value))
            }
        });
    }

    /**
     * @param {ChartDataDatasetValueModel} value
     * @returns {number}
     * @private
     */
    _extractValueFromValueModel(value) {
        if (value.tuples.length === 0) {
            throw new Error('value requires at least one tuple');
        }
        return value.tuples[0].value;
    }
}