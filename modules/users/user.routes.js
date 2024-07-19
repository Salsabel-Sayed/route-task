import { Router } from "express";
import { deleteUser, getAllUsers, getSpecificUsers, signin, signup, updateAll, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleWare/checkEmail.js";
import { validate } from "../../middleWare/validate.js";
import {signInVal, signUpVal} from "./user.validation.js"
import { verifyToken } from "../../middleWare/verfiyToken.js";



const userRouter = Router()

userRouter.post('/adduser',validate(signUpVal),checkEmail, signup)
userRouter.post('/signin',validate(signInVal), signin)
userRouter.put('/update/:id', verifyToken,updateUser)
userRouter.delete('/delete/:id',verifyToken, deleteUser)
userRouter.get('/getAllUsers', getAllUsers)
userRouter.get('/getSpecificUsers/:id', getSpecificUsers)
userRouter.put('/updateAll', updateAll)

export default userRouter
