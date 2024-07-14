
import { model, Schema } from "mongoose";



const userSchema = new Schema ({
    name: String ,
    email: String,
    password: String,
    token:String,
    logging :{
        type: Boolean,
        default: false
    }
},
{
    timestamps:{createAt:true},
    versionKey:false
}
)


export const User = model('User',userSchema) 