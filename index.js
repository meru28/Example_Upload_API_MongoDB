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

app.delete("/deleteuser/:nama", (req, res) => {
    MongoClient.connect(url, (err,db) => {
        //mengambil koleksion table users ditaruh di usercol
        userCol = db.collection("user");
        //terima 2 parameter objek dari properti tabel nama dan funct
        userCol.deleteOne({ nama: req.params.nama}, (err1, result) => {
            db.close();
            console.log(result);
            res.send(result);
        } )
    })
})

app.put("/updateuser/:nama", (req,res) => {
    MongoClient.connect(url, (err,db) => {
        userCol = db.collection("user");
        //
        userCol.updateMany({ nama: req.params.nama}, {$set: req.body}, (err1, result) => {
            db.close();
            res.send(result);
        })
    })
})

app.put("/tambahketurunan", (req,res) => {
    MongoClient.connect(url, (err,db) => {
        userCol = db.collection("user");
        //yg sebelah kiri adalah utk where, tengah perintah utk mengganti/yg mau di set
        userCol.updateMany({}, {$set: {keturunan: "arab"}}, (err1, result) => {
            db.close();
            res.send(result);
        })
    })
})



app.listen(port, () => console.log("API aktif di port" + port));