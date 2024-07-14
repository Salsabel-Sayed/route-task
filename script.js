
process.on('uncaughtException', (err)=>{
    console.log('error in code',err);
})

import express from 'express'
import {dbConnection} from "./dataBaseConnection/dbConnection.js"
import { appError } from './middleWare/appError.js'
import userRouter from './modules/users/user.routes.js'
import { globalError } from './middleWare/globalError.js'
import categoriesRouter from './modules/categories/category.routes.js';
import tasksRouter from './modules/tasks/task.routes.js';
const app = express()
const port = 3000



app.use(express.json())
app.use('/users', userRouter)
app.use('/tasks', tasksRouter)
app.use('/categories', categoriesRouter)

app.use('*',(req,res,next)=>{
    next(new appError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))