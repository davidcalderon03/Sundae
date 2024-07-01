const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
var jsonParser = bodyParser.json();
const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
mongoose.connect('mongodb://127.0.0.1:27017/sundae');

const userSchema = {
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String
}

const friendSchema = {
  originUsername: String,
  destinationUsername: String
}

const locationListSchema = {
  locations: [String]
}

const User = mongoose.model("User", userSchema);
const Friend = mongoose.model("Friend", friendSchema);


app.post("/createuser", jsonParser, async (req, res) => {
  try {
    const user = await User.findOne({usernameField: req.body.username});
    if (user) {
      res.json({message: "Username Taken"})
    } else {
      const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      user.save();
      console.log("Account created successfully!");
      res.json({message: "Success"});
    }
  } catch (error) {
    res.json({message: "Error"});
  }
});

app.post("/loginuser", jsonParser, async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({username: req.body.username});
    if (user) {
      if(user.password !== req.body.password){
        res.json({message: "Wrong Password"});
      }
      else{
        console.log("Logged in.");
        res.json({message: "Success"});
      } 
    } else {
      res.json({message: "No Matching Username"});
    }
  } catch (error) {
    console.log(error);
    res.json({message: "Error"});
  }
});

app.post("/finduser", jsonParser, async (req, res) => {
  try {
    const result = await User.find({username: req.body.username});
    if (result){
      res.json({message: "Success", result: results});
    } else {
      res.json({message: "No Matching Username"});
    }
  } catch (error) {
    res.json({message: "Error"});
  }
});

app.post("/findfriends", jsonParser, async (req, res) => {
  try {
    const results = await Friend.find({originUsername: req.body.originUsername});
    if (results) {
      console.log(results);
      res.json({message: "Success", result: results});
    } else {
      res.json({message: "No Matching Username"});
    }
  } catch (error) {
    res.json({message: "Error"});
  }
});

app.post("/addfriend", jsonParser, async (req, res) => {
  try {
    const connection = await Friend.findOne({originUsername: req.body.originUsername});
    const friend = await User.findOne({username: req.body.destinationUsername});
    if (!friend) {
      res.json({message: "FriendDoesNotExist"});
    } else if (connection) {
      res.json({message: "AlreadyFriends"});
    } else {
      const newFriend = new Friend({
        originUsername: req.body.originUsername,
        destinationUsername: req.body.destinationUsername,
      });
      friend.save();
      res.json({message: "Success"});
    }
  } catch (error) {
    res.json({message: "Error"});
  }
});

// const friend = new Friend({
//   originUsername: "davidcalderon03",
//   destinationUsername: "sundar"
// });
// friend.save();

// const user = new User({
//   username: "davidcalderon03",
//   firstName: "David",
//   lastName: "Calderon",
//   email: "davidcalderon03@hotmail.com",
//   password: "test123"
// });
// user.save();

// async function execute() {
//   try {
//     const data = await User.findOne({username: "davidcalderon03"});
//     if(!data){
//       res.json({message: "No Matching Username"});
//     } else {
//       console.log(data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// execute();