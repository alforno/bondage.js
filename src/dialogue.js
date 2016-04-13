'use strict';

const EventEmitter = require('events'),
      Runner = require('./runner.js').Runner,
      results = require('./results.js');

class Dialogue extends EventEmitter {
    constructor() {
        super();
        this.runner = new Runner();
    }

    /**
     * @param {string} [startNode=Start] - Name of the node to start the dialogue from
     * @return {Promise} A promise to parse through and run the dialogue
     */
    start(startNode) {
        if (startNode === undefined) {
            startNode = 'Start';
        }

        return new Promise((resolve, reject) => {
            this.emit('start');

            for (let result of this.runner.run(startNode)) {
                if (result instanceof results.LineResult) {
                    this.emit('line', result);
                }
                else if (result instanceof results.OptionsResult) {
                    this.emit('options', result);
                }
                else if (result instanceof results.CommandResult) {
                    // TODO: Command logic
                }
                else if (result instanceof results.NodeCompleteResult) {
                    this.emit('nodecomplete', result);
                }
                else {
                    throw new Error('Unrecognized dialogue result: ' + result);
                }
            }

            this.emit('finish');

            resolve();
        });
    }

    /**
     * Loads the given yarn data. If data has already been loaded, all new nodes
     * will be added, while any nodes that already existed will be updated
     * @param [object] data - Object of exported yarn JSON data
     */
    load(data) {
        this.runner.load(data);
    }
}

module.exports = {
    Dialogue: Dialogue,
};