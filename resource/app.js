const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser')
require('dotenv').config();  //for .env file (for security purpose)


const app = express();
const port=process.env.PORT || 5000;


const connectdb = require('./db/connectdb.js'); //database connection

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(expresslayouts);


app.set('layout','./layouts/main');   //for main layout for all pages if we want
app.set('view engine','ejs');


// load the  middleware
app.use(cookieParser())

//api routes
const resourceRouter=require('./routes/resource.js');
app.use('/resource',resourceRouter);

// error middleware
app.use((err,req,res,next)=>{
    const errorStatus=err.statusCode || 500;
    const errorMessages=err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message:errorMessages,
        stack:err.stack,
    });
});







const start=async()=>{
    try{
        await connectdb(process.env.MONGO_URI);
        app.listen(port,()=>{console.log(`Server is running on port ${port}`);});
    }catch(err){
        console.log(err);
    }
}
start();