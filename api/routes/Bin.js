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
    lng: Number,
    lock: {type : Boolean, default: false}
});

// compile schema to model
var Bin = db.model('Bin', BinSchema, 'binlist');

router.get("/", function(req, res, next) {
    Bin.find({}, null, function (err, bin) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('retrieved list of names', bin);
            res.send(bin);
        }
    });
});

router.post("/position", function(req, res, next) {
    Bin.findOne(req.body, { '_id': 0,'lng': 1, 'lat' : 1}, function (err, position) {
        if (err) {
            console.log(err);
        } else {
            console.log('retrieved position', position);
            res.send(position);
        }
    });
});

router.post("/add", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            res.send("Poubelle " + obj.name + " existe déjà");
        }
        else {
            Bin.create(obj, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log("One document inserted to Collection");
                }
            });
            res.send("Poubelle " + obj.name + " ajouté");
        }
    });
});

router.post("/delete", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.deleteOne(obj, function (err, docs) {
                if (err){
                    return console.error(err);
                } else {
                    console.log("One documents deleted from Collection");
                }
            });
            res.send("Poubelle "+ obj.name +" supprimé");
        }
        else {
            res.send("Poubelle " + obj.name + " n'existe pas");
        }
    });
});

router.post("/lock", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.updateOne(obj, {lock: true}, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log("One documents updated from Collection");
                }
            });
            res.send("Poubelle "+ obj.name +" locked");
        }
        else {
            res.send("Poubelle " + obj.name + " n'existe pas");
        }
    });
});

router.post("/unlock", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.updateOne(obj, {lock: false}, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log("One documents updated from Collection");
                }
            });
            res.send("Poubelle "+ obj.name +" unlocked");
        }
        else {
            res.send("Poubelle " + obj.name + " n'existe pas");
        }
    })
});

module.exports = router;