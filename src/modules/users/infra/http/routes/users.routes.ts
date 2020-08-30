import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatsarController = new UserAvatarController()
const upload = multer(uploadConfig)

usersRouter.post('/', usersController.create)

usersRouter.patch(
  '/update_avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatsarController.update
)

export default usersRouter
