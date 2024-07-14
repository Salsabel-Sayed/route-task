import { User } from './../../dataBaseConnection/models/users/user.model.js';
import  bcrypt  from 'bcrypt';
import jwt from "jsonwebtoken"
import { appError } from '../../middleWare/appError.js';
import { catchError } from './../../middleWare/catchError.js';


// * add user or signup
const signup = catchError(async(req,res)=>{   
    const addUser = await User.insertMany(req.body)
    res.json({message:'added',addUser})
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// * signin
const signin = catchError(async(req,res,next)=>{  
    try {
        let user = await User.findOne({email:req.body.email})

    if (!user || !bcrypt.compareSync(req.body.password , user.password)){
        return next(new appError('invalid email or password',401))
    }else{
        
        jwt.sign({userId: user._id, name: user.name , email:user.email , password:user.password, logging:true},'thisRouteBackEndTask',async(err,token)=>{
            // User.findOne({logging:req.body.logging})
            await User.updateOne({ _id: user._id }, { $set: { logging: true } });
            // await User.updateOne({ _id: user._id }, { $set: { token: token } });
            res.json({message:'signin',token})
        })
    }
    } catch (error) {
        next(error)
    }
    
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// * update user

const updateUser = catchError(async (req,res,next)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!updateUser) return next(new appError('worng id',401))
        res.json({message:'updated',updateUser})
    } catch (error) {
        next(error)
    }
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// * update all

const updateAll = catchError(async (req,res,next)=>{
    try {
        const updateUser = await User.updateMany({}, { $set: { logging: "false" } })
        if(!updateUser) return next(new appError('worng id',401))
            res.json({message:'updated',updateUser})
    } catch (error) {
        next(error)
    }
   
    
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// * delete user

const deleteUser = catchError(async (req,res,next)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id,req.body,{new:true})
        if(!deleteUser) return next(new appError('worng id',401))
            res.json({message:'deleted',deleteUser})
    } catch (error) {
        next(error)
    }
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// * get All Users

const getAllUsers = catchError(async (req,res,next)=>{
    const getAllUsers = await User.find()
    res.json({message:'weee',getAllUsers})
})
export{
    signup,
    signin,
    updateUser,
    deleteUser,
    getAllUsers,
    updateAll
    
}