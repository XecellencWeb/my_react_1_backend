import { Router } from 'express'
const router = Router()
import {addUser,getUser,updateUser,deleteUser,getUsers,countUsers} from ".././controllers/users.js"
import { verifyUser , verifyAdmin  } from '.././utils/verifyUser.js'


router.post('/', addUser )

router.post('/login', getUser)
router.get('/isAdmin/:token', verifyAdmin,(req,res,next)=>{
    res.status(200).json("is an admin")
})

router.put('/:id',verifyUser,updateUser)

router.delete('/delete/:id/:token',verifyUser,deleteUser)

router.get('/getUsers/:token',verifyAdmin,getUsers)
router.get('/countUsers', countUsers)

export default router