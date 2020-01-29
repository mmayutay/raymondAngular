const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mail = require("./mail");
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
      mail({ email: response[0].email, user: req.params.req }, res);
      res.send(response[0].username)
    })
  })
})

//For Deleting users post
app.get('/deletepost/:title', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("posts").deleteOne({ title: req.params.title }, {}, (err, response) => {
      res.send("done")
    })
  })
})

//For Adding an admin account
app.post('/adminadd', (req, res) => {
  console.log(req.body)
  MongoClient.connect(url, (err, db) => {
    var dbo = db.db("rareDatabase");
    dbo.collection("admin").insertOne(req.body, (err, response) => {
      res.send("done")
    })
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
