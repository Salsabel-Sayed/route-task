
import  jwt  from 'jsonwebtoken';
import { appError } from './appError.js';
import { catchError } from './catchError.js';


export const verifyToken = catchError(async(req,res,next)=>{
   
    let token = req.header('authorization')
   
    jwt.verify(token, 'thisRouteBackEndTask', async(err,decoded)=>{
            if(err) return next(new appError('invaild token', 401))
                next()
    })
})