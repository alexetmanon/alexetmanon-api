var restify = require('restify');

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
    res.send(req.params);

    return next();
});

/**
 * Run
 */
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});