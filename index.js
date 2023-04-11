const express=require('express');
const cors=require('cors');
const { connection } = require('./config/db');
const { userRouter } = require('./routes/User.route');
const { boardRouter } = require('./routes/Board.route');
const app=express();

app.use(cors());
app.use(express.json());

app.use('/users',userRouter)
app.use('/',boardRouter)




app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log('Connected to DB')
    }catch(err){
        console.log(`Cannot connect to DB: ${err}`)
    }
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})