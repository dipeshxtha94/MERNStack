import mongoose from "mongoose";

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    }

})

const taskModel = mongoose.model('taskModel', Task)

export default taskModel;