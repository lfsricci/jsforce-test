'use strict';

require('dotenv').config({
  silent: true
});

const express = require('express');
const server = require('./server');

server(express());