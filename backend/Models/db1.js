const mongoose= require('mongoose')

const DB_URL= process.env.DB_Connet
mongoose.connect(DB_URL)
.then(()=>{
    console.log('db connetd...');
    
}).catch((err)=>{
    console.log("db not connected" ,err);
    
})