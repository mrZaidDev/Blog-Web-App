import express from 'express'
import {postingPost,updatingPost,deletingPost} from '../controllers/postController.js'
const router = express.Router()

router.post('/', postingPost)
router.put('/:id',updatingPost)
router.delete('/:id',deletingPost)


export default router