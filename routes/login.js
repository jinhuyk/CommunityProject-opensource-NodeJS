/******************************************
- written by Jinhuyk. Mun 12/18/2022
*******************************************/

var router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const bcrypt =require('bcryptjs')
var db;

// input your MongoDB URL
const DB_URL = ""
MongoClient.connect(DB_URL, function(err,client){
    if(err) return console.log(err);
    db = client.db('searchcer');
})

const passport= require('passport');

const LocalStrategy= require('passport-local');
const session = require('express-session');
const { applyMiddleware } = require('redux');

router.use(session({secret : 'codepass' , resave : true, saveUninitialized : false}));
router.use(passport.initialize());

router.use(passport.session());

router.get('/login',function(req,res){
    res.render('login.ejs')
})
router.get('/registerpage',function(req,res){
    res.render('register.ejs', {Err : 0})
})
router.post('/login',passport.authenticate(
    'local', {
        failureRedirect : '/fail'
    }
), function(req,res){
    res.redirect('/')

    
})
router.get('/fail',function(req,res){
    res.write("<script>alert('ID or PASSWORD is Not Correct')</script>")
    res.write("<script>location.href='/login'</script>")
})


passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, function (uid, upw, done) { 
    db.collection('login').findOne({ id: uid }, function (err, rst) {
      if (err) return done(err)
  
      if (!rst) return done(null, false, { message: 'no id' })

        bcrypt.compare(upw, rst.pw,function(err,rst){
            try{
                if(rst){
                    console.log(rst)
                    return done(null,rst)
                }
                else {
                    return done(null, false, { message: 'password is not ' })
                }
            }
            catch(err){
                console.log(err)
            }
        })
    })
  }));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(uid, done){
    db.collection('login').findOne({id : uid}, function(err, rst){
        done(null, rst)
    })
})

router.post('/register',function(req,res){
    
    db.collection('login').findOne({id : req.body.id}, function(err,rst){
        if(rst != null){
            res.render('register.ejs', {Err : 1 })
        }
        else{
            bcrypt.hash(req.body.pw , 10, function(err, rst){
                try{
                    console.log(rst);
                    db.collection('login').insertOne({id : req.body.id , pw: rst  , nickname : req.body.nickname}, function(err, rst){
                        res.redirect('/')
                    })
        
                }
                catch(err){console.log(err)}
            })
        }
    })
    


    
})
module.exports = router;