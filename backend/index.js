const express= require('express')
const app= express()
const bodyparser= require("body-parser")
const cors= require('cors')
require('dotenv').config()
require('./Models/db1')


const AuthRouter= require('./Routes/AuthRouter')

const ProductRouter=require('./Routes/ProductsRouter')

const port= process.env.PORT || 8000

app.use(bodyparser.json())
app.use(cors())

app.use("/auth",AuthRouter)
app.use("/products",ProductRouter)


app.listen(port,()=>{
    console.log(`Server is runing ${port}`);
    
})