/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

/**
 * Importing app
 */
const app = require('./src/app');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

/**
 * connecting to db
 */
require('./src/lib/mongoose');

/**
 * importing models
 */
require('./src/models/User');
require('./src/models/Seat');
require('./src/models/Booking');
require('./src/models/Screen');
require('./src/models/Movie');
require('./src/models/Theatre');

http.createServer(app).listen(PORT, console.log(`server started at port:${PORT}`));
