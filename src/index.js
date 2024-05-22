require('dotenv').config()
// const exp = require('constants');
const express = require('express');
const http = require('http')
const path = require('path');
const app = express();
const server = http.createServer(app);
global.io = require('socket.io')(server)
const mongoCon = require('../src/connection/mongoDB');
const socketConnection = require('./connection/socketConnection')
const {redisConnection} = require('./connection/redisConnection')


app.use(express.json())
app.use(express.static('public'))

socketConnection();
redisConnection();
mongoCon();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname ,'../public/register.html'))

})
const register = require("../src/playing/register");
const login = require('../src/playing/login');
const {signUpValidation} = require('./validation/loginValidation');
const {loginValidation} = require('./validation/loginValidation');

app.post('/register',async(req,res)=>{
    console.log('register Api ==',req.body)
    register(req,res)
})

app.post('/login',(req,res)=>{
    console.log('login Api ==',req.body)
    login(req,res)
})



const port = process.env.PORT || process.argv[2]
server.listen(port,()=>console.log('Listening port on...!!!',port))