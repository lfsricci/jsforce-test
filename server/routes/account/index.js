'use strict';

const express = require('express');

const { AccountController } = require('./account.controller');

module.exports = (middlewares) => {

    const controller = new AccountController();
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    router.get('/name/:name', controller.getAccountByName.bind(controller));

    return router;
};