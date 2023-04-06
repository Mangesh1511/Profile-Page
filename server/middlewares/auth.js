const jwt=require('jsonwebtoken')
const express=require('express')

const isAuth=(req,res,next)=>{

    const authorization =req.headers.authorization;
    if(authorization)
    {
        const token=authorization.slice(8,authorization.length);
        console.log('token is:',token);
        try{
            const decode=jwt.verify(token,process.env.SECRET_KEY);
        console.log(decode);
        req.user=decode;
        next();
        }catch(err)
        {
            console.log('Error is: ',err);
        }
        

    }
    else
    {
        res.status(401).send({message:'No Token'});
    }
}

module.exports ={isAuth};