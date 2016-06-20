module.exports = (function () {
    var actions = {
        'undefined': {
            action: 'idontunderstand'
        },
        'bot': {
            action: 'bobby'
        },
        'manon': {
            action: 'manon'
        },
        'alex': {
            action: 'alex'
        }
    };

    /**
     * Build an action object based on the given label.
     * @param  String label
     * @return Object
     */
    function computeAction(bestClass) {
        if (!bestClass) {
            return actions['undefined'];
        }

        return actions[bestClass.label] || actions['undefined'];
    }

    return {
        computeAction: computeAction
    };
}());