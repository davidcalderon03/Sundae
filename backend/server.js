const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
mongoose.connect('mongodb://127.0.0.1:27017/sundae');

const userSchema = {
  firstNameField: String,
  lastNameField: String,
  usernameField: String,
  emailField: String,
  passwordField: String
}

const User = mongoose.model("User", userSchema);


app.post("/create", jsonParser, function(req, res){
  User.findOne({usernameField: req.body.username}, function(err, result){
    if(!err && req.body.password!=req.body.passwordMatch){
      res.json({message: "Confirm Password not Matching"});
    }
    else if(!err && !result){
      let encryptedPassword = encrypt(req.body.password);
      const user = new User({
        usernameField: req.body.username,
        firstNameField: req.body.firstName,
        lastNameField: req.body.lastName,
        emailField: req.body.email,
        passwordField: encryptedPassword,
      });
      user.save();
      console.log("Account created successfully!");
      res.json({message: "Success"});
    }
    else if(!err){
      res.json({message: "Username Taken"})
    }
    else{
      res.json({message: "Unknown Error"});
    }
  });
});


