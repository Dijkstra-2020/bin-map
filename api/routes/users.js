const express = require("express");
const bcrypt = require('bcryptjs');
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

var userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    role: String,
    team: String
});

// compile schema to model
var User = db.model('User', userSchema, 'userlist');


/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, null, function (err, user) {
		if (err) {
		    console.log(err);
		}
		else {
		    console.log('retrieved list of names', user);
		    res.send(user);
		}
	});
});

router.post('/login', function(req, res, next) {
	console.log(req.body);
	const obj = req.body;
	User.findOne({ email: obj.email }, function(err, result) {
   		if (result && (result.password === obj.password)) {
	   	 res.send(result);
		}
		else {
			res.status(401).send();
		}	
    
 	});
});

router.post('/signin', function(req, res, next) {
    const obj = req.body;
    console.log(obj);
    User.find({name : obj.email}, function (err, docs) {
        if (docs.length) {
            res.send("User " + obj.email + " existe déjà");
            res.status(401).send();
        }
        else {
            const user =  User.create(obj, function (err, docs) {
                if (err) {
                    res.status(401).send();
                } else {
                    console.log("One document inserted to Collection");
                }
            });
            res.send(user);
        }
    });
});

module.exports = router;
