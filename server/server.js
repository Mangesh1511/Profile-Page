require('./connection');
const express=require('express');
const app=express();
const axios=require('axios')
const cors=require('cors')
app.use(cors());
const CookieParser=require('cookie-parser')
app.use(CookieParser());
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
require('dotenv').config()

const userRoutes=require('./routes/userRoutes');



app.use('/api/user',userRoutes);


app.listen(5000,()=>{
    console.log('App is listening at 5000');
})