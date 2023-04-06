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


//Signin API
router.post('/signin',async(req,res)=>{

    try
    {

        const user=await User.findOne({email:req.body.email});
    if(user)
    {
        // console.log('User details are as follows: ',req.body,user.email);
        const Validpassword = await bcrypt.compare(req.body.password, user.password);
        if(Validpassword)
        {
            const token=jwt.sign({_id:user._id,email:user.email,username:user.username},process.env.SECRET_KEY,{expiresIn:'30d'});
            res.status(200).json({
                _id:user._id,
                email:user.email,
                username:user.username,
                token:token
            });
            return;
        }
        else
        {
            res.status(401).json({message:'Wrong password Please try again!'});
    
        }
    }
    else
    {
        res.status(401).send({message:'Email Not registered with us Please Sign Up to register!'});
        return;
    }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
    
   
})

router.get('/:id',async(req,res)=>{

    try
    {
        const person=await User.findById(req.params.id);
        console.log('Product\n',person)
        if(person)
        {
            console.log('hi there');
            res.status(200).send(person);
        }
        else 
        res.status(404).send({message:'No User Found'});

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"No user Found!!"})
    }
})



module.exports=router;