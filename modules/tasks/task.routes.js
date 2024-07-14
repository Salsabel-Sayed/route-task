import { Router } from "express"
import { addtasks, deleteTask, filterByOption, getAllTasks, getspecificTask, pagination, taskByCatgryName, updateTask } from "./task.controller.js"
// import { verifyToken } from "../../middleWare/verfiyToken.js"
import {verifyToken} from "../../middleWare/verfiyToken.js"




const tasksRouter = Router()

tasksRouter.use(verifyToken)
tasksRouter.post('/addtasks', addtasks)
tasksRouter.put('/updateTask/:id', updateTask)
tasksRouter.delete('/deleteTask/:id', deleteTask)
tasksRouter.get('/getAllTasks', getAllTasks)
tasksRouter.get('/getspecificTask/:id', getspecificTask)
tasksRouter.get('/taskByCatgryName/:id', taskByCatgryName)
tasksRouter.get('/filterByOption/:id', filterByOption)
tasksRouter.get('/pagination/', pagination)




export default tasksRouter