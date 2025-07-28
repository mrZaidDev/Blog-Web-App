import express from 'express'
import {RegisterController,LoginController,LogoutController} from '../controllers/userController.js'
const router = express.Router()

router.post('/register', RegisterController)
router.post('/login',LoginController)
router.get('/logout',LogoutController)

export default router