import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoute from './routes/auth.js';
import gamesRoute from './routes/games.js';
import draft from './routes/gamesDraft.js'
const app = express()

app.use(json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


app.use(
    cors({
        credentials:true,
        origin:'https://mygamereactappfrontend.onrender.com'
    }
    )
)

app.use('/auth', authRoute)
app.use('/games',gamesRoute)
app.use('/games_draft',draft)

app.use('/error_route',(err,req,res,next)=>{
  errMessage = err.message || "Something went wrong"
  errStatus = err.status || 500
  res.status(errStatus).json({
    sucess:false,
  status:errStatus,
  message:errMessage,
stack:err.stack})
})






async function main() {
  await mongoose.connect(process.env.DB);

  
}

mongoose.connection.on('disconnected',()=>console.log('disconnected'))

app.listen(process.env.port, ()=>{
    console.log('listening on port'+process.env.port)
    main().then(()=> console.log('connected to db').catch(err => console.log(err));
})
