import { Schema, model } from 'mongoose'


const usersModel = new Schema({
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:false,
        default:null
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        required:false,
        default:false
    }

})


export default model('users',usersModel)