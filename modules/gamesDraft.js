import {Schema, model} from 'mongoose'


const gamesDraftModel = new Schema({
    id:{
        type:String
    },
    name:{
        type:String,
        required:true
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
    }

})


export default model("gamesDraft",gamesDraftModel)