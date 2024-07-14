import { Category } from "../../dataBaseConnection/models/categories/categories.model.js"
import { catchError } from "../../middleWare/catchError.js";
import { appError } from './../../middleWare/appError.js';



//  * add Categories
const addCategories = catchError(async(req,res)=>{
    const addCatgry = await Category.insertMany(req.body)
    res.json({message:'added',addCatgry})
})

// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * update categories  and task ref id

const updateCategory = catchError(async(req,res,next)=>{
    try {
        const categoryId = req.params.id 
    const {taskRef} = req.body;
    const category = await Category.findOneAndUpdate({_id:categoryId},{taskRef},req.body,{new:true})
    if(!category){
        return next(new appError('category not found', 404));
    }
    res.json({message:'updated',category})
    } catch (error) {
        next(error);
    }
})


// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * delete categories
const deleteCategory = catchError(async(req,res,next)=>{
    try {
        const categoryId = req.params.id 
        const category = await Category.findByIdAndDelete({_id:categoryId},req.body,{new:true})
        if(!category) return next(new appError('category not found', 404));
        res.json({message:'deleted',category})
    } catch (error) {
        next(error);
    }
})

// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * get all categories

const getAllCategories = catchError(async(req,res,next)=>{
    try {
        const category = await Category.find()
        res.json({message:'get',category})
    } catch (error) {
        next(error);
    }
   
}
)
// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * get specific categories

const getspecificCategory = catchError(async(req,res,next)=>{
    try {
        const category = await Category.findById(req.params.id)
        if(!category) return next(new appError('category not found', 404))
        res.json({message:'get',category})
    } catch (error) {
        next(error);
    }
})

// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * pagenation

const pagination = catchError(async(req,res,next)=>{
    try {
        const page = req.query.page ;
    const limit = req.query.limit  ;
    const skip = (page - 1) * limit;
    const category = await Category.find().skip(skip).limit(limit).exec()

    if(!category) return next(new appError('category not found', 404))
        res.json({message:'page...',category})
    } catch (error) {
        next(error);
    }
})

// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * filtring by caregory name

const filterByCatgryName = catchError(async(req,res,next)=>{
    try {
        const catgryName = req.query.name
    const category = await Category.find({name:catgryName})
    if(!category) return next(new appError('category not found', 404))
        res.json({message:"filter by name",category})
    } catch (error) {
        next(error);
    }
})

export{
    addCategories,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getspecificCategory,
    pagination,
    filterByCatgryName
}