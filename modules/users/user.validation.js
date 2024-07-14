
import Joi from 'joi';

const signUpVal =Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'yahoo'] } }).required(),
    password: Joi.string().pattern(/^[A-Za-z0-9]{2,10}$/).required()
})

const signInVal =Joi.object({
    email: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'yahoo'] } }).required(),
    password: Joi.string().pattern(/^[A-Za-z0-9]{2,10}$/).required()
})



export {
    signUpVal,
    signInVal
}