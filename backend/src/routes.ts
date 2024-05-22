import express from 'express'
import multer from 'multer'

const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

import { validate } from './middlewares/validate'
import * as authController from './controllers/auth'
import * as spacesController from './controllers/spaces'
import * as reservationsController from './controllers/reservations'
import * as authSchemas from './schemas/auth'
import * as spacesSchemas from './schemas/spaces'
import * as reservationsSchemas from './schemas/reservations'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json({ ok: true })
})

routes.post('/signin', validate(authSchemas.signIn), authController.signIn)
routes.post('/signup', validate(authSchemas.signUp), authController.signUp)
routes.post('/auth/verify', authController.authVerify)
routes.get('/user', authController.getUser)

routes.post('/spaces', multerConfig.array('images'), spacesController.create)
routes.get('/spaces', spacesController.list)
routes.get('/spaces/:id/hours', spacesController.getHours)
routes.get('/spaces/:id/reservations', spacesController.getReservations)
routes.get('/spaces/:id', spacesController.show)
routes.delete('/spaces/:id', spacesController.remove)
routes.put(
  '/spaces/:id',
  validate(spacesSchemas.update),
  spacesController.update
)

routes.post(
  '/reservations',
  validate(reservationsSchemas.create),
  reservationsController.create
)
routes.get('/reservations', reservationsController.list)
routes.patch('/reservations/:id/cancel', reservationsController.cancel)

export default routes
