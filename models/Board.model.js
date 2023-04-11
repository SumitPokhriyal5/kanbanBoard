const mongoose=require('mongoose')
const {Schema}=mongoose;

const boardSchema=Schema({
    _id:Schema.Types.ObjectId,
    name: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'TaskModel'}]
});

const BoardModel=mongoose.model('board',boardSchema);

module.exports={
    BoardModel
}