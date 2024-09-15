const express = require('express');
const cookierParser = require('cookie-parser');
require('dotenv').config();
const userRouter = require('./routes/userRoute');
const postRoute = require('./routes/postRoutes');

const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
  
app.use(cookierParser());

app.use('/api/user', userRouter);

app.use('/api/post', postRoute);

app.get('/',(req, res) => {
    res.send("Hi, It's me!")
})


app.listen(3002, ()=>{
    console.log("Server is running on port 3002");
})