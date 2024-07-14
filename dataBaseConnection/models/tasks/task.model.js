
import { model, Schema } from "mongoose";


const taskSchema = new Schema({
    type:{
        type:String,
        enum:['text', 'list'],
        required:true
    },
    body:{
        type:String,
        required:true
    },
    shared:{
        type:String,
        enum:['Public', 'Private'],
    },
    CategoryRef:{
        type:Schema.Types.ObjectId,
        ref:'Category',
    },
    userRef:{
         type:Schema.Types.ObjectId,
         ref: 'User' 
        }

})

export const Task = model('Task', taskSchema)