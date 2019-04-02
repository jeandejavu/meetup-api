const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  // validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddleware)

routes.get('/preferences', handle(controllers.PreferenceController.index))

routes.post(
  '/users-preferences',
  handle(controllers.UserPreferenceController.store)
)

routes.get(
  '/users-preferences',
  handle(controllers.UserPreferenceController.index)
)

routes.post('/meetups', handle(controllers.MeetupController.store))
routes.get('/meetups', handle(controllers.MeetupController.index))
routes.get('/meetups/:id', handle(controllers.MeetupController.show))

module.exports = routes
