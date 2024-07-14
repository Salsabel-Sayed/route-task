import { User } from "../dataBaseConnection/models/users/user.model.js";
import bcrypt from "bcrypt"



export const checkEmail = async(req,res,next)=>{
    // const {email} = req.body;
    let emailFound = await User.findOne({email:req.body.email})
    if(emailFound) return res.status(400).json({message:"Email already exists"})
        req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
    
}