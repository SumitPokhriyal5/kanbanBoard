const mongoose=require('mongoose')
const {Schema}=mongoose;

const taskSchema=Schema({
    _id:Schema.Types.ObjectId,
    title : String,
	description : String,
	status : {type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo'},
	subtask : [{ type: Schema.Types.ObjectId, ref: 'SubtaskModel'}]
});

const TaskModel=mongoose.model('task',taskSchema);

module.exports={
    TaskModel
}