import express from 'express'
import {postingPost,updatingPost,deletingPost} from '../controllers/postController.js'
const router = express.Router()

router.post('/', postingPost)
router.put('/:id',updatingPost)
router.delete('/:id',deletingPost)
router.get('/',(req,res) => {
    res.json({message:"It works if there is no db uses uri"})
})

export default router