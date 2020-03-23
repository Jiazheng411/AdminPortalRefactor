var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var request = require('request');


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
    var agent_info = {
        "userPassword": req.body.password,
        "userFirstName" : req.body.firstname,
        "userLastName" : req.body.lastname,
        "userEmailAccount" : req.body.email,
        
        "details": {
            "languages": {
                "english": req.body.english,
                "chinese": req.body.chinese,
                "malay": req.body.malay
            },
            "skills":{
                "insurance": req.body.skill1,
                "fraud": req.body.skill2,
                "bank_statement": req.body.skill3
            }
        }
    }
    if(firstname!=''){
        console.log("hello updating agent")
        // TODO call api to update agents
        var options = {
            'method': 'POST',
            'url': 'https://sheltered-journey-07706.herokuapp.com/api/v1/agent_creation',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(agent_info)
          };
          request(options, function (error, response) { 
            if (error) {
                res.send(404);
                throw new Error(error);
            }
            console.log(response.body);
        });
        console.log("hello add agent success")
        res.send(200);
    }
    else{
        res.send(404);
    }
});


app.get('/view_agents', function(req, res){
    // TODO call api to get all agents
    var options = {
    'method': 'GET',
    'url': 'https://sheltered-journey-07706.herokuapp.com/db/all',
    'headers': {
    }
    };
    request(options, function (error, response) { 
        if (error) {
            console.log(error);
            res.render('view_agents', {"agents": {}});
            throw new Error(error);
        }
        // console.log(response.body);
        var body_data = JSON.parse(response.body);
        if ( response.statusCode == 200 && body_data.success == true){
            agents = body_data.data;
            console.log("successfully got agents");
            res.render('view_agents', {"agents": agents});
        }
        else{
            res.render('view_agents', {"agents": {}})
        }
    });
    // var agents = [
    //     {
    //         "agent_id": "fake_rainbow_id1",
    //         "firstname": "Jacob",
    //         "lastname": "Wijaya",
    //         "email": "wijaya_jacob@gmail.com",
    //         "availability": 0,
    //         "english": 1,
    //         "chinese": 0,
    //         "malay": 0,
    //         "insurance": 1,
    //         "bank statement": 1,
    //         "fraud": 1,
    //         "delete_link": "fake_rainbow_id1"
    //     },
    //     {
    //         "agent_id": "fake_rainbow_id2",
    //         "firstname": "someone",
    //         "lastname": "Wijaya",
    //         "email": "wijaya_jacob@gmail.com",
    //         "availability": 0,
    //         "english": 1,
    //         "chinese": 0,
    //         "malay": 0,
    //         "insurance": 1,
    //         "bank statement": 1,
    //         "fraud": 1,
    //         "delete_link": "fake_rainbow_id2"
    //     }
    // ]
    
});


app.get('/edit_agent/:id', function(req, res){
    // TODO call api to get agents info
    // var agent_info = {
    //     "firstname": "some name",
    //     "lastname": "some last name",
    //     "email": "'some email'",
    //     "chinese": "checked:'true'",
    //     "english": '',
    //     "malay":1,
    //     "insurance": 1,
    //     "fraud": 0,
    //     "bank_statement": 0
    // }
    console.log("get agent infor " + req.params.id)
    var options = {
        'method': 'GET',
        'url': 'https://sheltered-journey-07706.herokuapp.com/db/agent/'+ req.params.id,
        'headers': {
        }
    };
    console.log(options.url);
    request(options, function (error, response) { 
        if (error) {
            console.log(error);
            res.render('edit_agent',{"agent": agent_info = {}, "agent_id": ""})
            throw new Error(error);
        }
        // console.log(response.body);
        var body_data = JSON.parse(response.body);
        if ( response.statusCode == 200 && body_data.success == true){
            agent_info = body_data.data;
            console.log("successfully got agent " + req.params.id);
            res.render('edit_agent',{"agent": agent_info, "agent_id": agent_info.agent_id});
        }
        else{
            res.render('edit_agent',{"agent": agent_info = {}, "agent_id": ""})
        }
    });
});


app.post('/edit_agent/:id', function(req,res){
    console.log("editing agent "+ req.params.id)
    var agent_info = {
        "rainbow_id": req.params.id,
        "personalInfo":{
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname,
            "email" : req.body.email
        },
        "details": {
            "languages": {
                "english": req.body.english,
                "chinese": req.body.chinese,
                "malay": req.body.malay
            },
            "skills":{
                "insurance": req.body.skill1,
                "fraud": req.body.skill2,
                "bank_statement": req.body.skill3
            }
        }
    }
    // TODO call api to update agents
    var options = {
        'method': 'POST',
        'url': 'https://sheltered-journey-07706.herokuapp.com/api/v1/update_agent',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(agent_info)
        
    };
    request(options, function (error, response) { 
        if (error) {
            res.send(404);
            throw new Error(error);
        }
        console.log(response.body);
    });
    console.log("hello updating agent success")
    res.send(200);
});


app.post('/delete_agent/:id', function(req, res){
    //call api to delete agent
    agent_id = req.params.id
    console.log("deleting agent" + agent_id);
    var options = {
        'method': 'POST',
        'url': 'https://sheltered-journey-07706.herokuapp.com/api/v1/delete_agent',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"userId":agent_id})  
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log(response.body);
    });
    res.send(200);
});


app.listen(80);