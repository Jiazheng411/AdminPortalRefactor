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
    console.log(firstname,lastname,email,password, chinese, english, skill1,skill2);
    if(firstname!=''){
        console.log("hello updating agent")
        // var options = {
        //   'method': 'POST',
        //   'url': 'http://10.12.214.214:3000/db/add',
        //   'headers': {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //                         "rainbow_id":name,
        //                         "name":name,
        //                         "details":{
        //                             "languages":{
        //                                 "english":english,
        //                                 "chinese": chinese,
        //                                 "malay": malay
        //                                 },
        //                             "skills":{
        //                                 "insurance":skill1,
        //                                 "fraud": skill2,
        //                                 "bank statement":skill3
        //                                 }
        //                             }
        //                         })
        
        // };
        // request(options, function (error, response) { 
        //   if (error) {
        //         res.send(404);
        //         throw new Error(error);             
        //   }
        //   console.log(response.body);
        //   res.send(200);
        // });
        res.send(200);

    }
    else{
        res.send(404);
    }
});

app.get('/view_agents', function(req, res){

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
            "fraud": 1
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
            "fraud": 1
        }
    ]

    // table_html = "";
    // for (var i = 0; i < agents.length; i++) {
    //     table_html += "<tr><th>" + agents[i].name + "</th><th>" + agents[i].chinese + "</th></tr>" 
    // }
    res.render('view_agents', {"agents": agents});
// 　　if(req.session.user){
//         console.log("view all agents");

        
//         var options = {
//         'method': 'GET',
//         'url': 'http://10.12.214.214:3000/db/all',
//         'headers': {
//         }
//         };
//         request(options, function (error, response) { 
//         if (error) throw new Error(error);
//         console.log(response.body);
//         });

//         //var rows = JSON.parse(request.body);

//     　　res.render('view_agents',{rows: request.body});

// 　　}else{
// 　　　　req.session.error = "Please Login First"
// 　　　　res.redirect('login');
// 　　}
});

app.get('/edit_agent/:id', function(req, res){
    res.render('edit_agent');
});


app.post('/edit_agent/:id', function(req,res){
    var name = req.body.name;
    var chinese = req.body.chinese;
    var english = req.body.english;
    var skill1 = req.body.skill1;
    var skill2 = req.body.skill2;
    console.log(name, chinese, english, skill1,skill2);
    if(name!= ''){
        var options = {
            'method': 'PUT',
            'url': 'http://10.12.214.214:3000/db/update/' + req.params.id,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"rainbow_id":"fake_rainbow_id4","name":"Jacob","details":{"languages":{"english":1,"chinese":0,"malay":1}}})
    
            };
            request(options, function (error, response) {
            res.send(404); 
            if (error) throw new Error(error);
            console.log(response.body);
            });
            res.send(200);
    }
    else{
        res.send(404);
    }

})

app.post('/delete_agent/:id', function(req, res){
    　　if(req.session.user){
        var options = {
        'method': 'PUT',
        'url': 'http://10.12.214.214:3000/db/delete/' + req.params.id,
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"rainbow_id":"fake_rainbow_id4","name":"Jacob","details":{"languages":{"english":1,"chinese":0,"malay":1}}})

        };
        request(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log(response.body);
        });

    　　}else{
    　　　　req.session.error = "Please Login First"
    　　　　res.redirect('login');
    　　}
    });






app.listen(80);