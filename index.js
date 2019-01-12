const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://merunih:meru725@ds151814.mlab.com:51814/popokpedia";
var port = 1997;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("<h1>Selamat Datang di API mongodb popokpedia</h1>");
})

app.get("/user", (req, res) => {
    MongoClient.connect(url, (err,db) => {
       var userCol = db.collection("user");
        userCol.find({}).toArray((err1, docs) => {
            db.close();
            console.log(docs[1].julukan);
            res.send(docs);
        })
    })
})


app.post("/adduser", (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, (err,db) => {
       userCol = db.collection("user");
        userCol.insertMany(req.body, (err, result) => {
            db.close();
            // console.log(docs[1].julukan);
            res.send(result);
        }) 
    })
})


app.listen(port, () => console.log("API aktif di port" + port));