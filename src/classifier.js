var nlp = require('natural');

module.exports = (function () {
    var classifier = new nlp.LogisticRegressionClassifier(),
        MIN_CONFIDENCE = 0.7;

    /**
     * PRIVATES
     */

    /**
     * Compute the best class from classes list based on value attribute.
     * @param  Array classes
     * @return Object
     */
    function getBestClass(classes) {
        return classes.reduce(function (previous, current) {
            return previous.value > current.value ? previous : current;
        }, {
            value: 0
        });
    }

    /**
     * PUBLICS
     */

    /**
     * Train the classifier with data from the training.json file.
     */
    function train() {
        var dataset = require('../training.json'),
            i,
            len = dataset.length;

        for (i = 0; i < len; i += 1) {
            classifier.addDocument(dataset[i].sample, dataset[i].label);
        }

        classifier.train();
    }

    /**
     * Compute the best class for the given phrase.
     * @param  String phrase
     * @return Object
     */
    function interpret(phrase) {
        var classes,
            bestClass;

        classes = classifier.getClassifications(phrase.toLowerCase());

        if (!classes || classes.length < 1) {
            return undefined;
        }

        bestClass = getBestClass(classes);
        if (bestClass.value < MIN_CONFIDENCE) {
            return undefined;
        }

        return bestClass;
    }

    // Public API
    return {
        train: train,
        interpret: interpret
    };
}());