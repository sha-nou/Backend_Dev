const { default: mongoose } = require("mongoose");

const taskSchema= new mongoose.Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
    maxlength:500,
    minlength:10,
    default:'No description provided.',
    trim:true,
},
dueDate:{
    type:Date,
    required:true},
status:{
    type:String,
    enum:['To Do','In Progress','Completed'],
    default:'To Do',
    lowercase:true,
    trim:true,
},
priority:{
    type:String,
    enum:['Low','Medium','High'],
    default:'Medium'}
})
module.exports = mongoose.model("Task",taskSchema)