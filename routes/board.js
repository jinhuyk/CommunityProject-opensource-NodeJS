/******************************************
- written by Jinhuyk. Mun 12/18/2022
*******************************************/

var router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const { render } = require('ejs');
var db;
// input your MongoDB URL
const DB_URL = ""
MongoClient.connect(DB_URL, function(err,client){
    if(err) return console.log(err);
    db = client.db('searchcer');
})
router.get('/norboard',function(req,res){
    db.collection('post').find({type : "일반"}).toArray(function(err,rst){
      
        res.render('main.ejs',{posts : rst})
    })
})
router.get('/infoboard',function(req,res){
    db.collection('post').find({type : "정보"}).toArray(function(err,rst){
  
        res.render('main.ejs',{posts : rst})
    })
})
router.get('/tmiboard',function(req,res){
    db.collection('post').find({type : "뻘글"}).toArray(function(err,rst){
  
        res.render('main.ejs',{posts : rst})
    })
})
router.get('/funboard',function(req,res){
    db.collection('post').find({type : "웃긴"}).toArray(function(err,rst){
     
        res.render('main.ejs',{posts : rst})
    })
})
router.get('/scrtboard',function(req,res){
    db.collection('post').find({type : "비밀"}).toArray(function(err,rst){
  
        res.render('main.ejs',{posts : rst})
    })
})
module.exports = router;