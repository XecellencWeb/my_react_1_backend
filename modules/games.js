import {Schema, model} from 'mongoose'


const gamesModel = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    pictures:{
        type:[String]
    },
    isTrending:{
        type:Boolean,
        default:false
    },
    categories:{
        type:[String]
    },
    likesNumber:{
        type:Number,
        default:0
    },
    likedby:{
        type:[String],
        default:[]
    }

})


export default model("games",gamesModel)