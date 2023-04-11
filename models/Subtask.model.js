const mongoose=require('mongoose')
const {Schema}=mongoose;
const subtaskSchema=Schema({
    _id:Schema.Types.ObjectId,
    title : String,
	isCompleted : Boolean
});

const SubtaskModel=mongoose.model('subtask',subtaskSchema);

module.exports={
    SubtaskModel
}