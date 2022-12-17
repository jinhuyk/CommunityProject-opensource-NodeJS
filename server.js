/******************************************
- written by Jinhuyk. Mun 12/18/2022
*******************************************/

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const cookieParser= require('cookie-parser');
app.use(cookieParser())

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true})) 
require('dotenv').config()
const bcrypt =require('bcryptjs');


const MongoClient = require('mongodb').MongoClient;
var db;

// input your MongoDB URL
const DB_URL = ""

MongoClient.connect(DB_URL, function(err,client){
    if(err) return console.log(err);
    db = client.db('searchcer');
})
app.set('view engine', 'ejs');
app.use('/styles',express.static(path.join(__dirname,'styles')))
app.use('/resources',express.static(path.join(__dirname,'resources')))

app.listen(process.env.PORT || 3000, function(){
    console.log('open 8080')
})
app.get('/',function(req,res){
    db.collection('post').find().toArray(function(err,rst){
        res.render('main.ejs', {posts : rst })
    })
})



function onLogin(req,res,next){
    if(req.user){
        next()
    } else{
        res.send("there is not login")
    }
}
app.use('/', require('./routes/post.js') );
app.use('/', require('./routes/login.js') );
app.use('/', require('./routes/board.js') );