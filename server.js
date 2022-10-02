var express = require("express");
var app = express();
var path = require("path");
var HTTP_PORT = process.env.PORT || 8080;
var data=require("./data-service");
// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
app.use(express.static('public'));
// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

app.get("/home",function(req,res) {
     res.redirect("/");
})
// setup another route to listen on /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));

});

app.get("/employees", function(req,res){
    data.getAllEmployees().then(function(data){
        res.json(data);
    }).catch(function(err){
       res.json({message: err});
    });
});

app.get("/managers", function(req,res){
    data.getManagers().then(function(data){
        res.json(data);
    }).catch(function(err){
       res.json({message: err});
    });
});

app.get("/departments", function(req,res){
    data.getDepartments().then(function(data){
        res.json(data);
    }).catch(function(err){
       res.json({message: err});
    });
});

app.get('*', function(req, res){
    res.send('Page Not Found', 404);
  });


data.initialize().then(function() {
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);    
}).catch(function(data){
console.log(data);
});

