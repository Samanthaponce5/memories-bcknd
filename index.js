import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'
import postRoutes from './routes/posts.js'


dotenv.config()

const app = express()
const port = process.env.PORT || 3001


app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"30", extended:true }))
app.use(cors())
app.use('/posts', postRoutes)
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(port,()=>console.log(`Listening on port: ${port}`)))
.catch((err)=> console.log(err.message))

