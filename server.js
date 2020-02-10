const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mail = require("./mail");
var ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// for the sign-up
app.post('/people', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("rareDatabase");
    dbo.collection("users").insertOne(req.body, (err, response) => {
      res.send(response.ops)
      db.close();
    });
  });

})

//for the log-in
app.post('/log_in', (req, res) => {
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db("rareDatabase");
      dbo.collection("users").findOne({ "username": req.body.username }, (err, response) => {
        if (response == null) {
          res.send(null)
        } else {
          if (req.body.username == response.username && req.body.password == response.password) {
            res.send(response)
          } else {
            res.send(null)
          }
        }
        db.close();
      });
    });
})


//For Posting
app.post('/post', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("rareDatabase");
    dbo.collection("posts").insertOne(req.body, (err, response) => {
      res.send(response.ops)
      db.close();
    });
  });
})


//Showing all the post
app.get('/showpost', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("posts").find({}).toArray((err, response) => {
      res.send(response)
    });
  });
});

//Showing all users with the same address
app.get('/postedbyaddress/:name', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("posts").find({ username: req.params.name }).toArray((err, response) => {
      res.send(response)
    });
  });
})

//Showing the user data
app.get('/userdata/:name', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("users").find({ username: req.params.name }).toArray((err, response) => {
      res.send(response)
    });
  });
})


//For Sending Email to the recipient
app.get('/sendMessage/:name/:req', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("users").find({ username: req.params.name }).toArray((err, response) => {
      dbo.collection("users").find({ username: req.params.req }).toArray((err, resp) => {
        mail({ email: response[0].email, user: req.params.req , request: resp[0].email}, res);
        res.send(response[0].username)
      })     
    })
  })
})

//For Admin/Users deleting post
app.get('/deletepost/:title', (req, res) => {
  MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("posts").deleteOne({ title: req.params.title }, {}, (err, response) => {
      res.send("done")
    })
  })
})
//For showing all users
app.get('/showusers', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("users").find({}).toArray((err, response) => {
      res.send(response)
    })
  })  
})
//For Deleting user by admin
app.get('/deleteuser/:name', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("users").deleteOne({username: req.params.name}, (err, response) => {
      dbo.collection("posts").deleteMany({username: req.params.name}, (err, ponse) => {
        res.send(response)
      })
    })
  })  
})
//For finding a post's details
app.get('/showdetails/:id', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("posts").findOne({_id: ObjectID(req.params.id)}, (err, response) => {
      res.send(response)
    })
  })  
})
//For Updating a user's info
app.post('/updateInfo/:name', (req, res) => {
  var valueFromUser = req.body[0]
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("posts").updateOne({username: req.params.name}, {$set: {username: valueFromUser.username}}, { upsert: true }, (err, pon) =>{
      dbo.collection("users").updateOne({_id: ObjectID(valueFromUser._id)},
      { $set: {firstname: valueFromUser.firstname,
               lastname: valueFromUser.lastname,
               username: valueFromUser.username,
               address: valueFromUser.address,
               age: valueFromUser.age,
               gender: valueFromUser.gender,
               email: valueFromUser.email,
               password: valueFromUser.password,
               confirmpassword: valueFromUser.confirmpassword
               }},{ upsert: true },(err, response) => {
       res.send(valueFromUser.username)
     }) 
    })
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
