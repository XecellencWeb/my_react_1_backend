import bcrypt from "bcrypt"
import users from '.././modules/user.js'
import {error} from '.././utils/error.js'
import jwt from "jsonwebtoken"

export const addUser = async(req,res,next)=>{

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new users({
        fullName:req.body.fullName,
        userName:req.body.userName,
        email:req.body.email,
        password:hash
    })


    try {
        const savedUser = await newUser.save()
        const user = savedUser._doc
        const {password,isAdmin,...otherDetails} = user

        const token = jwt.sign({id: user._id, isAdmin:user.isAdmin},process.env.jwt)
        res.status(200).json({...otherDetails, token})
    } catch (error) {
        next(error)
    }

}


export const updateUser = async(req,res,next)=>{
    try{

        const updateUser = await users.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updateUser)

    }catch(error){
        
        next(error)

    }
}

export const getUser =  async(req,res,next)=>{
    try{
    const user = await users.findOne({userName:req.body.userName})
    if(!user)return next(error(404,"User not Found"))
    const isPassword = await bcrypt.compare(req.body.password,user.password)
    if(!isPassword)return next(error(400,'Wrong password'))

    const token = jwt.sign({id: user._id, isAdmin:user.isAdmin},process.env.jwt)
       const {isAdmin,password,...otherDetails} = user._doc
    res.status(200).json({...otherDetails,token})
    }catch(err){
        next(err)
    }
}

export const getUsers = async(req,res,next)=>{
    try{
        const allUser = await users.find()
        res.status(200).json(allUser)
    }catch(err){
       next(err)
    }
}

export const deleteUser = async(req,res,next)=>{

    try{

         await users.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")

    }catch(err){
        next(err)
    }

}

export const countUsers = async(req,res,next)=>{
    try {
        const count =  await users.countDocuments()
        res.status(200).json(`${count}`)
    } catch (error) {
        next(error)
    }
 
}