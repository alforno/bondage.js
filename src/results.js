'use strict';

class DialogueResult {
}

class LineResult extends DialogueResult {
    constructor(text) {
        super();

        this.text = text;
    }
}

class OptionsResult extends DialogueResult {
    constructor(options) {
        super();

        this.options = options;

        // Callback to be set by the runner to be notified about the choice
        this.choiceCallback = null;
    }

    /**
     * Choose the given option
     * @param {string} option - The option that the user chose
     */
    choose(option) {
        if (this.choiceCallback) {
            this.choiceCallback(option);
        }
        else {
            throw new Error('No choice callback has been set by the runner!');
        }
    }
}

class CommandResult extends DialogueResult {
}

class NodeCompleteResult extends DialogueResult {
}

module.exports = {
    LineResult: LineResult,
    OptionsResult: OptionsResult,
    CommandResult: CommandResult,
    NodeCompleteResult: NodeCompleteResult,
};
