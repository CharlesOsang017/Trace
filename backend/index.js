import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())


app.listen(8000, ()=>{
  console.log("server is running on port 8000")
})