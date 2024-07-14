import { Router } from "express"
import { addCategories, deleteCategory, filterByCatgryName, getAllCategories, getspecificCategory, pagination, updateCategory } from "./category.controller.js"
import { verifyToken } from "../../middleWare/verfiyToken.js"



const categoriesRouter = Router()

categoriesRouter.use(verifyToken)

categoriesRouter.post('/addCategories', addCategories)
categoriesRouter.put('/updateCategory/:id', updateCategory)
categoriesRouter.delete('/deleteCategory/:id', deleteCategory)
categoriesRouter.get('/getAllCategories', getAllCategories)
categoriesRouter.get('/getspecificCategory/:id', getspecificCategory)
categoriesRouter.get('/pagination/', pagination)
categoriesRouter.get('/filterByCatgryName/', filterByCatgryName)



export default categoriesRouter