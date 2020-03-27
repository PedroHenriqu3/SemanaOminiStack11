const express = require("express");
const crypto = require('crypto');
const connection = require('./database/connection');
const OngControllers = require('./Controllers/OngController')
const ControllIncidents = require('./Controllers/IncidentController')
const ProfileController = require('./Controllers/ProfileController')
const SessionController = require('./Controllers/SessionController')

const routes = express.Router();

routes.get('/incident', ControllIncidents.index);
routes.get('/ongs', OngControllers.index);
routes.post('/ongs', OngControllers.create);
routes.post('/incident', ControllIncidents.create);
routes.delete('/incident/:id', ControllIncidents.delete);
routes.get('/profile', ProfileController.index);
routes.post('/session', SessionController.create);

module.exports = routes;