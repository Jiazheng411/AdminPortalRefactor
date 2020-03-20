var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var mysql = require('mysql');
var request = require('request');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "escdb"
})

app.set('views', __dirname);
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
 

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*10 //expire time (ms)
    }
}));

app.use(function(req, res, next){
　　res.locals.user = req.session.user;
　　var err = req.session.error;
　　res.locals.message = '';
　　if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
　　next();
});

app.get('/', function(req, res) {
    res.render('index');
});


app.get('/home',function(req,res){
    　　if(req.session.user){
    　　　　res.render('home');
    　　}else{
    　　　　req.session.error = "Please Login First"
    　　　　res.redirect('login');
    　　}
    });


app.get('/login',function(req,res){
    res.render('login');
});


app.post('/login',function(req,res){
    console.log("logging in post url");
    　　var user={
    　　　　username:'admin',
    　　　　password:'admin'
    　　}
    　　if(req.body.username==user.username&&req.body.password==user.password){
    　　　　req.session.user = user;
    　　　　res.send(200);
    　　}else{
    　　　　req.session.error = "Invalid Username or Password";
    　　　　res.send( 404 );
    　　}
    });


app.get('/logout', function(req, res){
    　　req.session.user = null;
    　　req.session.error = null;
    　　res.redirect('index');
    });
    app.get('/index', function(req, res) {
    　　res.render('index');
});
 

app.get('/add_agent', function(req, res){
　　if(req.session.user){
　　　　res.render('add_agent');
    }
    else{
　　　　req.session.error = "Please Login First"
　　　　res.redirect('login');
    }
});

app.post('/add_agent',function(req,res){
    console.log("adding agent post url")
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var chinese = req.body.chinese;
    var english = req.body.english;
    var malay = req.body.malay;
    var skill1 = req.body.skill1;
    var skill2 = req.body.skill2;
    var skill3 = req.body.skill3;
    console.log(firstname,lastname,email,password,chinese,english,malay,skill1,skill2,skill3);
    if(firstname!=''){
        console.log("hello updating agent")
        // TODO call api to update agents
        res.send(200);

    }
    else{
        res.send(404);
    }
});

app.get('/view_agents', function(req, res){
    // TODO call api to get all agents
    var agents = [
        {
            "agent_id": "fake_rainbow_id1",
            "firstname": "Jacob",
            "lastname": "Wijaya",
            "email": "wijaya_jacob@gmail.com",
            "availability": 0,
            "english": 1,
            "chinese": 0,
            "malay": 0,
            "insurance": 1,
            "bank statement": 1,
            "fraud": 1,
            "edit_link": "/edit_agent" + "/fake_rainbow_id1",
            "delete_link": "/delete_agent" + "/fake_rainbow_id1"
        },
        {
            "agent_id": "fake_rainbow_id2",
            "firstname": "someone",
            "lastname": "Wijaya",
            "email": "wijaya_jacob@gmail.com",
            "availability": 0,
            "english": 1,
            "chinese": 0,
            "malay": 0,
            "insurance": 1,
            "bank statement": 1,
            "fraud": 1,
            "edit_link": "/edit_agent" + "/fake_rainbow_id2",
            "delete_link": "/delete_agent" + "/fake_rainbow_id2"
        }
    ]
    res.render('view_agents', {"agents": agents});
});

app.get('/add_agent', function(req, res){
    　　if(req.session.user){
    　　　　res.render('add_agent');
        }
        else{
    　　　　req.session.error = "Please Login First"
    　　　　res.redirect('login');
        }
    });


app.get('/edit_agent/:id', function(req, res){
    // TODO call api to get agents info
    var agent_info = {
        "firstname": "some name",
        "lastname": "some last name",
        "email": "'some email'",
        "chinese": "checked:'true'",
        "english": '',
        "malay":1,
        "skill1": 1,
        "skill2": 0,
        "skill3": 0
    }
    var agent_id = req.params.id
    console.log(agent_id)
    res.render('edit_agent',{"agent": agent_info, "agent_id": agent_id});
});


app.post('/edit_agent/:id', function(req,res){
    console.log("editing agent post url")
    var agent_id = req.body.id
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var chinese = req.body.chinese;
    var english = req.body.english;
    var malay = req.body.malay;
    var skill1 = req.body.skill1;
    var skill2 = req.body.skill2;
    var skill3 = req.body.skill3;
    console.log(firstname,lastname,email,chinese,english,malay,skill1,skill2,skill3);
    if(firstname!=''){
        // TODO call api to update agents
        console.log("hello updating agent")
        res.send(200);
    }
    else{
        res.send(404);
    }
});

app.post('/delete_agent/:id', function(req, res){
    //call api to delete agent
    agent_id = req.params.id
    console.log("deleting agent" + agent_id);
    res.send(200);
});


app.listen(80);