import express from 'express'
const Router = express.Router()
import authenticatingUser from '../middlewares/authUser.js'
import {gettingAllPosts,gettingSinglePost,gettingMyPosts} from '../controllers/postController.js'

Router.get('/',gettingAllPosts)
Router.get('/my-posts',authenticatingUser,gettingMyPosts)
Router.get('/:id',gettingSinglePost)

export default Router