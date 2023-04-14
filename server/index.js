'use strict';

const startApp = app => {
    const http = require('http');
    const server = http.createServer(app);
    server.timeout = 0;
    const port = process.env.port;
    server.listen(port, () => {
        console.log('Local HTTP Express server started on http://localhost:' + port);
    });
};

const configureApp = app => {
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    let reqCounter = 0;
    app.get('/jsforce-test/hello', function (req, res) {
        reqCounter++;
        let responseId = `RESPONSE_CODE_ID: ${reqCounter}`;
        res.send(responseId);
    });

    const allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
        // Intercept OPTIONS method
        if ('OPTIONS' === req.method) {
            res.send(200, '');
        } else {
            next();
        }
    };
    app.use(allowCrossDomain);
};

const initRoutes = (app) => {
  const account = require('./routes/account');

  app.use('/jsforce-test/account', account());
};

const init = app => {
    configureApp(app);
    initRoutes(app);
    startApp(app);
};

module.exports = init;