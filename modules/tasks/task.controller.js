import { User } from '../../dataBaseConnection/models/users/user.model.js';
import { appError } from '../../middleWare/appError.js';
import { catchError } from '../../middleWare/catchError.js';
import { Task } from './../../dataBaseConnection/models/tasks/task.model.js';




// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * add tasks
const addtasks = catchError(async(req,res)=>{
    const addtask = await Task.insertMany(req.body)
    res.json({message:'added',addtask})
}
)
// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * update tasks  and category ref id

const updateTask = catchError(async(req,res,next)=>{
    try {
        const taskId = req.params.id;
        const CategoryRef  = req.body.CategoryRef;

        const task = await Task.findOneAndUpdate({ _id: taskId }, { CategoryRef:CategoryRef }, req.body, { new: true });

        if (!task) {
            return next(new appError('Task not found', 404));
        }

        res.json({ message: 'updated', task });
    } catch (error) {
        next(error);
    }
}
)

// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * delete tasks
const deleteTask = catchError(async(req,res,next)=>{
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return next(new appError('Task not found', 404));
        }

        res.json({ message: 'deleted', task });
    } catch (error) {
        next(error);
    }
}
)
// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * get all tasks

const getAllTasks = catchError(async(req,res,next)=>{
    try {
        const tasks = await Task.find();
        res.json({ message: 'retrieved all tasks', tasks });
    } catch (error) {
        next(error);
    }
}
)
// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * get specific tasks

const getspecificTask = catchError(async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new appError('Task not found', 404));
        }

        res.json({ message: 'retrieved specific task', task });
    } catch (error) {
        next(error);
    }
}
)
// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * pagenation

const pagination = catchError(async(req,res,next)=>{
    try {
        const page = req.query.page ;
    const limit = req.query.limit  ;
    const skip = (page - 1) * limit;
    const task = await Task.find().skip(skip).limit(limit).exec()

    if(!task) return next(new appError('task not found', 404))
        res.json({message:'updated',task})
    } catch (error) {
        next(error);
    }
})


// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * filtring tasks by category name

const taskByCatgryName = catchError(async (req, res, next) => {
    try {
        const tasks = await Task.find({ CategoryRef: req.params.id }).populate('CategoryRef', 'name -_id');
        res.json({ message: 'filtered tasks by category name', tasks });
    } catch (error) {
        next(error);
    }
})

// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * filtring By task shared option (Public/Private) by token


// const filterByOption = catchError(async(req,res,next)=>{
//     try {
//                 const userToken = await User.findOne({ token: req.headers.authorization }); 
//                 console.log("userToken",userToken._id);
//                 if (!userToken._id) {
//                     return next(new appError('User not found', 404));
//                 }
        
//                 const taskId = await Task.findOne({ userRef: req.params.id });
//                 console.log("taskId",taskId.userRef);
//                 if (!taskId.userRef) {
//                     return next(new appError('Task not found', 404));
//                 }
//                 if(userToken._id && taskId.userRef){
//                 if (userToken.logging === true) {
//                     const { option } = req.body;
        
//                     let tasks;
//                     if (option === 'private') {
//                         tasks = await Task.find({ shared: 'Private', userRef: req.params.id });
//                         res.json({ message: "Private tasks", tasks });
//                     } else if (option === 'public') {
//                         tasks = await Task.find({ shared: 'Public', userRef: req.params.id });
//                         res.json({ message: "Public tasks", tasks });
//                     } else if (option === 'both') {
//                         tasks = await Task.find({ userRef: req.params.id });
//                         res.json({ message: "All tasks", tasks });
//                     } else {
//                         return next(new appError('Invalid option. Choose private, public, or both.', 400));
//                     }
//                 } else {
//                     const foundPublic = await Task.find({ shared: 'Public', userRef: req.params.id });
//                     res.json({ message: "Public tasks for user with logging set to false", foundPublic });
//                 }
//             }
//             } catch (error) {
//                 next("catch err",error);
//             }

// })

// ? /////////////////////////////////////////////////////////////////////////////////////////////////

//  * filtring By task shared option (Public/Private) by looging true or false without token

const filterByOption = catchError(async (req, res, next) => {
    try {
        const userId = await User.findById(req.params.id);
        if (!userId) {
            return next(new appError('User not found', 404));
        }

        const taskId = await Task.findOne({ userRef: req.params.id });
        if (!taskId) {
            return next(new appError('Task not found', 404));
        }

        if (userId.logging === true) {
            const { option } = req.body;

            let tasks;
            if (option === 'private') {
                tasks = await Task.find({ shared: 'Private', userRef: req.params.id });
                res.json({ message: "Private tasks", tasks });
            } else if (option === 'public') {
                tasks = await Task.find({ shared: 'Public', userRef: req.params.id });
                res.json({ message: "Public tasks", tasks });
            } else if (option === 'both') {
                tasks = await Task.find({ userRef: req.params.id });
                res.json({ message: "All tasks", tasks });
            } else {
                return next(new appError('Invalid option. Choose private, public, or both.', 400));
            }
        } else {
            const foundPublic = await Task.find({ shared: 'Public', userRef: req.params.id });
            res.json({ message: "Public tasks for user with logging set to false", foundPublic });
        }
    } catch (error) {
        next(error);
    }
})



export{
    addtasks,
    updateTask,
    deleteTask,
    getAllTasks,
    getspecificTask,
    taskByCatgryName,
    filterByOption,
    pagination
 
}