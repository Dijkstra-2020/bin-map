const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";
mongoose.connect("mongodb://mongodb:27017/bin");
var db = mongoose.connection;
// Connecting to MongoDB
// If there is a connection error send an error message
db.on("error", error => {
    console.log("Database connection error:", error);
});
// If connected to MongoDB send a success message
db.once("open", () => {
    console.log("Connected to Database!");
});
var BinSchema = mongoose.Schema({
    name: String,
    lat: Number,
    lnt: Number
});

// compile schema to model
var Bin = db.model('Bin', BinSchema, 'binlist');

/*
// documents array
var bins = [{ name: 'Bin1', lat: 10, lnt: 25 },
    { name: 'Bin2', lat: 10, lnt: 20 },
    { name: 'Bin3', lat: 10, lnt: 23 }];
Bin.collection.insert(bins, function (err, docs) {
    if (err){
        return console.error(err);
    } else {
        console.log("Multiple documents inserted to Collection");
    }
});
 */

router.get("/", function(req, res, next) {
    Bin.find({}, 'name', function(err, users){
        if(err){
            console.log(err);
        } else{
            console.log('retrieved list of names', users);
            res.send(users);
        }
    });
});

module.exports = router;