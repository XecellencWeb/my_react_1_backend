import jwt from 'jsonwebtoken'
import {error} from './error.js'


export const verifyToken = (req,res,next)=>{
    const token = req.body.token || req.params.token
    if(!token)return next(error(401,'You are not authenticated'))
    jwt.verify(token,process.env.jwt,(err, user)=>{
        if(err)return next(error(403,'You are not logged in'))
        req.user = user
        console.log(req.user)
        next()
    })
}


export const verifyUser = (req,res, next)=>{
    verifyToken(req, res,()=>{
    if(req.user.id == req.params.id || req.user.isAdmin) return next()
     next(error(401,'you are not authorized'))
    })
   
}

export const verifyAdmin = (req,res, next)=>{
    verifyToken(req,res, ()=>{
    if(req.user.isAdmin) return next()
     next(error(401,'you are not authorized'))
    })
   
}



