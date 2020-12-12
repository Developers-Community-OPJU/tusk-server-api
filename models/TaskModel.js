const mongoose = require("mongoose");
const Joi = require('joi');

// TASK MODEL
const TaskModel = new mongoose.Schema({
    heading: { type: String , required: true, trim: true, maxlength: 255 },
    description: { type: String, required: true, trim: true },
    assignedBy: { type: String },
    milestones : [{ 
        title : { type: String, required: true, maxlength: 255},
        description: { type: String, required: true, trim: true },
        issue : {
            type: Boolean,
            default: false
        },  
        issues : [String],   
    }],
    status: {
        type: String,
        enum: ["Accepted", "Declined", "Progress","Completed","Not Accepted"],
        default: "Not Accepted" 
    },
    assignedTo: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users'
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
       
});



// VALIDATING USER SCHEMA
function validateTask(task) {
    const schema = Joi.object({
        heading: Joi.string(),
        description: Joi.string().required(),
        assignedBy: Joi.string().required(),
        assignedTo: Joi.string().required().min(6).max(255),
        milestones : Joi.array()   
    });
    
    return schema.validate(task);
}


const Task = new mongoose.model('tasks', TaskModel)

module.exports = {
    Task,
    validateTask
}