const routes = require('express').Router();

const { IvanRibeiroFunction } = require('../controllers');

routes.get('/',IvanRibeiroFunction);

module.exports = routes;