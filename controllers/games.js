
import games from '../modules/games.js'
import {error} from '../utils/error.js'


export const addGame = async(req,res,next)=>{
    const newGame = new games({...req.body})
    try {
        const savedGame = await newGame.save()
        res.status(200).json(savedGame)
    } catch (error) {
        next(error)
    }

}


export const updateGame = async(req,res,next)=>{
    try{

        const updateGame = await games.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updateGame)

    }catch(error){
        
        next(error)

    }
}

export const getGame =  async(req,res,next)=>{
    try{
    const game = await games.findById(req.params.id)
    if(!game)return next(error(404,"game not Found"))
    res.status(200).json(game)
    }catch(err){
        next(err)
    }
}

export const getGames = async(req,res,next)=>{
    try{
        const allGames = await games.find()
        res.status(200).json(allGames)
    }catch(err){
       next(err)
    }
}

export const deleteGame = async(req,res,next)=>{

    try{

         await games.findByIdAndDelete(req.params.id)
        res.status(200).json("Game has been deleted")

    }catch(err){
        res.status(500).json('Cannot delete Data')
    }

}

export const countGames = async(req,res,next)=>{
    try {
        const count = await games.countDocuments()
        res.status(200).json(`${count}`)
    } catch (error) {
        next(error)
    }
 
}

export const updateLikes = async(req,res,next)=>{
    try {
        const toLike = await games.findById(req.params.id)
        toLike.likedby.push(req.params.whoLiked)
        await toLike.save()
        toLike.likesNumber = toLike.likedby.length
        await toLike.save()
        res.status(200).json(toLike)
    } catch (err) {
        next(err)
    }
}
export const disliked = async(req,res,next)=>{
    try {
        const toDislike = await games.findById(req.params.id)
        toDislike.likedby.splice(toDislike.likedby.indexOf(req.params.disliked),1)
        await toDislike.save()
        toDislike.likesNumber = toDislike.likedby.length
        await toDislike.save()
        res.status(200).json(toDislike)
        
    } catch (err) {
        next(err)
    }
}