/* const http =require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': 'text/html'})
    fs.readFile('index.html', function(error, data){
        if(error){
            res.writeHead(404)
            res.write('Error: File Not Found')
        }else{
            res.write(data)
        }
        res.end();
    }) 
   


});
server.listen(port, function(error){
    if(error){
      console.log('Something went wrong', error);

    }else{
        console.log('Server is listening on port ' + port);
    }
}); */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors());
app.use(bodyParser.json());

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("index");
});

mongoose.connect("mongodb://localhost:27017/advizDB", ()=> {
    console.log("Connected to DB")
})

const userRouter = require("./routes/users");
const contactRouter = require("./routes/contacts");

app.use("/users", userRouter);
app.use("/contacts", contactRouter);


app.listen(3000);