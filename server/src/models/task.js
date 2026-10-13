const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Title is required'],
        minLength:[3, "Minimum 6 character is required"],
        maxLength: [16, "Maximum 16 character not more then that"]
    },
    description:{
        type:String,
        required:[true, "Description is required"]
    },
    isCompleted:{
        type:Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;