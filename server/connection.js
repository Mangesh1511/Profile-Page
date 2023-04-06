const mongoose=require('mongoose');
mongoose.set('strictQuery',true);

mongoose.connect('mongodb+srv://Mangesh:ZF1ElpwcFmweeAKN@cluster0.kl7teuz.mongodb.net/CipherSchool')
.then((result)=>{
    console.log('MongoDB connection succeeded\n');
})
.catch((err)=>{
    console.log('Connection Error is as follows: ',JSON.stringify(err));
})
