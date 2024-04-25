import express from 'express'

import * as authController from './controllers/auth'
import * as spacesController from './controllers/spaces'
import * as reservationsController from './controllers/reservations'

const routes = express.Router()

routes.post('/signin', authController.signIn)
routes.post('/signup', authController.signUp)

routes.post('/spaces', spacesController.create)
routes.get('/spaces', spacesController.list)
routes.get('/spaces/:id/hours', spacesController.getHours)
routes.get('/spaces/:id', spacesController.show)
routes.delete('/spaces/:id', spacesController.remove)
routes.put('/spaces/:id', spacesController.update)

routes.post('/reservations', reservationsController.create)
routes.get('/reservations', reservationsController.list)
routes.patch('/reservations/:id/cancel', reservationsController.cancel)

export default routes
