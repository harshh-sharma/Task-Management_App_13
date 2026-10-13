const Task = require("../models/task");
const User = require("../models/user");

const createTask = async (req, res) => {
    try{
        const {id} = req.user;
        const {title, description} = req.body;

        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({
                success: false,
                message:"user not found",
                data:{}
            })
        }

        const task = await Task.create({
            title,
            description,
            user:id
        });


        if(!task){
            return res.status(400).json({
                success: false,
                message:"something went wrong",
                data:{}
            })
        }

        return res.status(200).json({
            success: false,
            message:"task successfully created",
            data:task
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            data:{}
        })
    }
}

const getAllTask = async (req, res) => {
    try{
        const {id} = req.user;

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found",
                data:{}
            })
        }

        const tasks = await Task.find({user:id});

        return res.status(200).json({
            success:true,
            message:"successfully get tasks",
            data: tasks
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"something went wrong",
            data:{}
        })
    }
}

const getSpecificTask = async (req, res) => {
    try{
        const taskId = req.params.id;
        const {id} = req.user;

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found",
                data:{}
            })
        }


        const task = await Task.findById(taskId);

        const isLoggedInUserTask = task.user == id ? true : false;

        if(!isLoggedInUserTask){
            return res.status(400).json({
                success: false,
                message:"access denied",
                data:{}
            })
        }

        if(!task){
            return res.status(404).json({
                success: false,
                message:"task not found",
                data:{}
            })
        }

        return res.status(200).json({
            success: true,
            message:"successfully get specific task",
            data:task
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"something went wrong",
            data:{}
        })
    }
}

const updateTask = async (req, res) => {
    try{
        const {id} = req.user;
        const taskId = req.params.id;
        let updatedData = {
            ...req.body
        }

      
        if(req?.body?.title?.length < 6){
            return res.status(400).json({
                success: false,
                message: "title atleast 6 character"
            })
        }

         if(req?.body?.description?.length <= 1){
            return res.status(400).json({
                success: false,
                message: "description atleast contains one character"
            })
        }



       if(typeof(Boolean(req?.body?.isCompleted)) == Boolean){
             return res.status(400).json({
                success: false,
                message:"Invalid complete status"
            })
       }else{
        updatedData = {
            ...updatedData,
            isCompleted: Boolean(req?.body?.isCompleted)
        }
       }

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found",
                data:{}
            })
        }

        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({
                success: false,
                message:"task not found",
                data:{}
            })
        }

       

        const updateTask = await Task.findByIdAndUpdate(taskId,{
            ...updatedData
        });


        return res.status(200).json({
            success: true,
            message:"successfully updated task",
            data: updateTask
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"something went wrong",
            data:{}
        })
    }
}

const deleteTask = async (req, res) => {
    try{ 
        const {id} = req?.user;
        const taskId =  req?.params?.id;

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found",
                data:{}
            })
        }

        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({
                success: false,
                message:"task not found",
                data:{}
            })
        }

        const isLoggedInUserTask = task.user == id ? true : false;

        if(!isLoggedInUserTask){
            return res.status(400).json({
                success: false,
                message:"access denied",
                data:{}
            })
        }

        await Task.findByIdAndDelete(taskId);

        return res.status(200).json({
            success: true,
            message:"task successfully deleted",
            data:{}
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"something went wrong",
            data:{}
        })
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTask,
    getSpecificTask
}