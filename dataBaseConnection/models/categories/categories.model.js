import { model, Schema } from "mongoose";




const categorySchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    userCatRef:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    taskRef:[{
        type:Schema.Types.ObjectId,
        ref: 'Task',
        required:true,
    }]
})


export const Category = model('Category', categorySchema)