import express from 'express'
import {RegisterController,LoginController,LogoutController,IsAuthenticated} from '../controllers/userController.js'
const router = express.Router()
import authUser from '../middlewares/authUser.js'


router.post('/register', RegisterController)
router.post('/login',LoginController)
router.get('/logout',LogoutController)
router.get('/profile',authUser,IsAuthenticated)

export default router