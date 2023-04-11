const express=require('express');
const { BoardModel } = require('../models/Board.model');
const { TaskModel } = require('../models/Task.model');
const mongoose=require('mongoose');
const { SubtaskModel } = require('../models/Subtask.model');
require('dotenv').config()

const boardRouter=express.Router();

/* BOARD ROUTE */
boardRouter.post('/boards',async(req,res)=>{
    try{
        const board=new BoardModel({
            _id:new mongoose.Types.ObjectId(),
            name:req.body.name,
            tasks:[]
        });
        await board.save()
        res.send({msg:"Board Created Successfully",board})
    
    }catch(err){
        res.send({msg:"Something went wrong",error:err})
    }
});

boardRouter.post('/boards/:boardId/tasks',async(req,res)=>{
    
    try{
        const {boardId}=req.params;
        console.log(boardId)
        const board=await BoardModel.findById(boardId)
        if(!board)return res.status(404).send({msg:"Board not found"});
console.log(board)
        
        const task=new TaskModel({
            _id:new mongoose.Types.ObjectId(),
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            subtask:[]
        });
        await task.save()
        board.tasks.push(task)
        await board.save()
        res.status(201).send({msg:'Task Added Successful',task})
    
    }catch(err){
        res.send({msg:"Something went wrong",error:err})
    }
});



boardRouter.post('/tasks/:taskId/subtasks',async(req,res)=>{
    
    try{
        const {taskId}=req.params;
        const task=await BoardModel.findById(taskId)
        if(!task)return res.status(404).send({msg:"Task not found"});

        
        const subtask=new SubtaskModel({
            _id:new mongoose.Types.ObjectId(),
            title:req.body.title,
            isCompleted:req.body.isCompleted
        });
        await subtask.save()
        task.subtask.push(subtask)
        await task.save()
        res.status(201).send({msg:'Subtask Added Successful',subtask})
    
    }catch(err){
        res.send({msg:"Something went wrong",error:err})
    }
});


module.exports={
    boardRouter
}