const router=require('express').Router();
const User=require('../models/userModel');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


router.post('/signup',async(req,res)=>{
    console.log(req.url,req.method,req.body);
    try
    {
    
    const Checkuser =await User.findOne({email:req.body.email});

    if(!Checkuser)
    {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.password,salt);
        const person=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        });

        const user=person.save();
        const token=jwt.sign({_id:user._id,email:user.email,username:user.username},process.env.SECRET_KEY,{expiresIn:'30d'});
    

        res.status(200).json({
            _id:user._id,
            email:user.email,
            username:user.username,
            token:token
        });
    }
    else
        res.status(404).send({message:'Already Registered With Us! Please try to SignIn'});
    
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send('Backend Error');
    }
});






module.exports=router;