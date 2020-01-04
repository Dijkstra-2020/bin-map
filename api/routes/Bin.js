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
    lock: {type : Boolean, default: false},
    full: {type: Number, default: 0},
    active: {type : Boolean, default: true}
});

// compile schema to model
var Bin = db.model('Bin', BinSchema, 'binlist');

/**
 * GET list of poubelles
 * route = 'ip:port/bin/'
 * no param
 */
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

/**
 * POST get position of a poubelle
 * route = 'ip:port/bin/position'
 * param = {_id : poubelle_id_value}
 */
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

/**
 * POST add a poubelle in database
 * route = 'ip:port/bin/add'
 * param =
 * {
        name: String,
        lat: Number,
        lng: Number,
        lock: {type : Boolean, default: false},
        full: {type: Number, default: 0}
    }
 */
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

/**
 * POST delete a poubelle in database
 * route = 'ip:port/bin/delete'
 * param =
 * {
        name: String
   }
 */
router.post("/delete", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.deleteOne({name : obj.name}, function (err, docs) {
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

/**
 * POST lock a poubelle in database
 * route = 'ip:port/bin/lock'
 * param =
 * {
        name: String
   }
 */
router.post("/lock", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.updateOne({name : obj.name}, {lock: true}, function (err, docs) {
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

/**
 * POST unlock a poubelle in database
 * route = 'ip:port/bin/unlock'
 * param =
 * {
        name: String
   }
 */
router.post("/unlock", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.updateOne({name : obj.name}, {lock: false}, function (err, docs) {
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

/**
 * POST Clear a poubelle in database
 * route = 'ip:port/bin/clear'
 * param =
 * {
        name: String
   }
 */
router.post("/clear", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.updateOne({name : obj.name}, {full: 0}, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log("One documents updated from Collection");
                }
            });
            res.send("Poubelle "+ obj.name +" cleared");
        }
        else {
            res.send("Poubelle " + obj.name + " n'existe pas");
        }
    })
});

/**
 * POST load a poubelle in database
 * route = 'ip:port/bin/load'
 * param =
 * {
        name: String,
        full: Number
   }
 */
router.post("/load", async function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    await Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.updateOne({name : obj.name}, {full: obj.full}, async function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    await console.log("One documents updated from Collection");
                }
            });
            res.send("Poubelle "+ obj.name +" loaded");
        }
        else {
            res.send("Poubelle " + obj.name + " n'existe pas");
        }
    })
});

/**
 * POST Set a poubelle to inactive and lock it in database
 * route = 'ip:port/bin/inactivate'
 * param =
 * {
        name: String
   }
 */
router.post("/inactivate", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.updateOne({name : obj.name}, {active: false, lock: true}, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log("One documents updated from Collection");
                }
            });
            res.send("Poubelle "+ obj.name +" inactive and locked");
        }
        else {
            res.send("Poubelle " + obj.name + " n'existe pas");
        }
    });
});

/**
 * POST Set a poubelle to active in database
 * route = 'ip:port/bin/inactivate'
 * param =
 * {
        name: String
   }
 */
router.post("/activate", function(req, res, next) {
    console.log(req.body);
    const obj = req.body;
    Bin.find({name : obj.name}, function (err, docs) {
        if (docs.length) {
            Bin.updateOne({name : obj.name}, {active: true}, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log("One documents updated from Collection");
                }
            });
            res.send("Poubelle "+ obj.name +" active");
        }
        else {
            res.send("Poubelle " + obj.name + " n'existe pas");
        }
    });
});
module.exports = router;