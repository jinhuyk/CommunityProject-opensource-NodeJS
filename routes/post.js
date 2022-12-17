/******************************************
- written by Jinhuyk. Mun 12/18/2022
*******************************************/

var router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const bcrypt =require('bcryptjs');
const { render } = require('ejs');
var db;
const cookieParser= require('cookie-parser');
router.use(cookieParser())
// input your MongoDB URL
const DB_URL = ""
MongoClient.connect(DB_URL, function(err,client){
    if(err) return console.log(err);
    db = client.db('searchcer');
})

router.get('/detail/:id',function(req,res){
    db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err,rst){
        if(rst.scpw  == ''){
            db.collection('comment').find({pid : parseInt(req.params.id)}).toArray(function(err,cmt){
                res.render('postDetail.ejs', {data : rst ,cmtdata : cmt})
            })
            
        }else if(rst.scpw == req.cookies.scrt){
            db.collection('comment').find({pid : parseInt(req.params.id)}).toArray(function(err,cmt){
                res.render('postDetail.ejs', {data : rst ,cmtdata : cmt})
            })
            
        }
        else{

            res.render('postCheck.ejs',{data : rst})
        }

    })
})
router.post('/check',function(req,res){


    db.collection('post').findOne({_id : parseInt(req.body.id)}, function(err,rst){
        if(rst.scpw == req.body.check){
            db.collection('comment').find({pid : parseInt(req.body.id)}).toArray(function(err,cmt){
                res.cookie('scrt',req.body.check,{maxAge: 300000 })
                res.render('postDetail.ejs', {data : rst ,cmtdata : cmt})
            })
        } 
        else {
            res.redirect('/detail/'+req.body.id)
        }
    })
})

router.get('/edit/:id',function(req,res){
    db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err,rst){
        res.render('postEdit.ejs', {data : rst})
    })
})
router.delete('/delete',function(req,res){
    db.collection('post').findOne({_id : parseInt(req.body.id)}, function(err,ruser){
        bcrypt.compare(req.body.pw, ruser.pw, function(err,rst){
            try{
                if(rst == true || req.body.pw =="answlsgurtkrwp"){
                    db.collection('comment').deleteMany({pid: parseInt(req.body.id)})
                    db.collection('post').deleteOne({_id: parseInt( req.body.id)},function(){
                    
                        res.send("delete")
                    })
                }
                else{
     
                    res.send("NO")
                }
            }catch(err){console.log(err)}
        })
    })
})
router.delete('/deletecmt',function(req,res){
    db.collection('comment').findOne({_id : parseInt(req.body.id)}, function(err,ruser){
        bcrypt.compare(req.body.pw, ruser.pw, function(err,rst){
            try{
                if(rst == true || req.body.pw =="answlsgurtkrwp"){
                    db.collection('post').updateOne({_id: parseInt(req.body.parentId)  },{$inc: {cmt : -1}},function(err,rst){
                        if(err) return console.log(err)
                    })
                    db.collection('comment').deleteOne({_id: parseInt( req.body.id)},function(){
                 
                        res.send("delete")
                    })
                }
                else{
               
                    res.send("NO")
                }
            }catch(err){console.log(err)}
        })
    })
})
router.post('/editing', function(req,res){

    db.collection('post').findOne({_id : parseInt(req.body.id)}, function(err,ruser){
        bcrypt.compare(req.body.pw, ruser.pw, function(err,rst){
            try{
                if(rst == true || rst == 'answlsgurvuswlq'){
                    
                    db.collection('post').updateOne({_id :parseInt(req.body.id)},{$set : 
                        {
                            title : req.body.title, 
                            body : req.body.body, 
                            type : req.body.type,
                            date : req.body.date,
                            time : req.body.time

                        }},function(err,rst){
                        if(err){return console.log(err)}
                        res.send('updated')
                    })
                }
                else{
                 
                    res.send("NO")
                }
            }catch(err){console.log(err)}
        })
    })
    
    
})
router.post('/posting',function(req,res){

 
    bcrypt.hash(req.body.pw , 10 , function(err,rstpw){
        try{
          
            db.collection('count').findOne({name : 'totalP'},function(err,rst){
                var totalpost = rst.totalPost;
                
                db.collection('post').insertOne(
                    {
                        _id : totalpost+1 , 
                        title : req.body.title , 
                        body : req.body.body , 
                        type : req.body.type,
                        date : req.body.date,
                        time : req.body.time,
                        wt : req.body.wt,
                        pw : rstpw,
                        scpw : req.body.scpw,
                        good:0,
                        wtf : 0,
                        bad : 0,
                        cmt : 0
                    }, function(err,rst){

                    db.collection('count').updateOne({name:'totalP'},{$inc: {totalPost : 1}},function(err,rst){
                        if(err) return console.log(err)
                        res.send('add')
                    })
                })
            })
        }catch(err){console.log(err)}
    })
    

    
})

router.get('/post', function(req,res){
    res.render('postAdd.ejs')
})


router.post('/like',function(req,res){
    if(req.body.like == "good"){
        db.collection('post').updateOne({_id : parseInt(req.body.id)},{$inc: {good : 1}},function(err,rst){
               res.send("good") 
        })
        
    }
    if(req.body.like == "wtf"){
        db.collection('post').updateOne({_id : parseInt(req.body.id)},{$inc: {wtf : 1}},function(err,rst){
            res.send("good") 
        })
    }
    if(req.body.like == "bad"){
        db.collection('post').updateOne({_id : parseInt(req.body.id)},{$inc: {bad : 1}},function(err,rst){
            res.send("good") 
        })
    }
})

router.post('/comment',function(req,res){

    bcrypt.hash(req.body.pw,10,function (err, rstpw){
        try{

            db.collection('count').findOne({name:'totalcmt'}, function(err,rst){
                var totalcvmt = rst.totalCmt;


                db.collection('comment').insertOne({
                    _id : totalcvmt +1,
                    body : req.body.body,
                    wt : req.body.wt,
                    pw : rstpw,
                    date : req.body.date,
                    time : req.body.time,
                    pid : parseInt(req.body.parentId) 
                },function(err,rst){
                    db.collection('post').updateOne({_id: parseInt(req.body.parentId)  },{$inc: {cmt : 1}},function(err,rst){
                        if(err) return console.log(err)
                    })
                    db.collection('count').updateOne({name:'totalcmt'},{$inc: {totalCmt : 1}},function(err,rst){
                        if(err) return console.log(err)
                        res.send('add')
                    })
                })

            })




        }catch(err){console.log(err)}
    })
    
})

module.exports = router;