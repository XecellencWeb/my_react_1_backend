import { Router } from 'express'
const router = Router()
import {addGame,updateGame,deleteGame,getGame,getGames, countGames, updateLikes, disliked} from ".././controllers/games.js"
import { verifyAdmin  } from '.././utils/verifyUser.js'



router.get('/',(req,res)=>{
    res.send('Games page')
})

router.post('/game/:token',verifyAdmin,addGame )

router.put('/update/:id/:token',verifyAdmin, updateGame)

router.put('/updateLikes/:id/:whoLiked',updateLikes)
router.delete('/unlike/:id/:disliked', disliked)

router.delete('/delete/:id/:token',verifyAdmin,deleteGame)

router.get('/games/:id',getGame)

router.get('/games',getGames)
router.get('/countGames', countGames)

export default router