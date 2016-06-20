var restify = require('restify'),
    classifier = require('./src/classifier'),
    action = require('./src/action');

/**
 * Configuration
 */
var server = restify.createServer({
    name: 'alex et manon NLP API'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());

/**
 * Routes
 */
server.post('/interpret', function (req, res, next) {
    var bestClass,
        bestAction;

    if (!req.params.phrase) {
        return next(new restify.BadRequestError("'phrase' content is missing"));
    }

    bestClass = classifier.interpret(req.params.phrase);
    bestAction = action.computeAction(bestClass);

    res.send(bestAction);

    return next();
});

/**
 * Run
 */

// training
console.log('Classifier training...');
classifier.train();

// run server
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});