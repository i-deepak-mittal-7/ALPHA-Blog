const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to The ALPHA BLOG. Here you see the blogs of Deepak Mittal. A student at Delhi Technological University (2024 Batch).";
const aboutContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://bat:p1p1@cluster0.urm9th1.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String 
};

const Post = mongoose.model("Post", postSchema);

const adminSchema = {
  username: String,
  password: String 
};

const Admin = mongoose.model("Admin", adminSchema);

var isUserLogin = false;

app.get("/signIn",function(req,res){
  res.render("signIn.ejs");
});

app.post("/signIn",function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  Admin.findOne({ username: username}, function (err, foundAdmin){
    if(!err) {
      if(foundAdmin){
        if(foundAdmin.password===password)
          res.render("compose");
      }
    }
  }); 
});

app.get("/home",function(req,res){
  Post.find(function(err, posts){
    if(!err) {
    res.render("home", { homeStartingContent: homeStartingContent, posts: posts })
  }
  });
});

app.get("/compose",function(req,res){
  if(!isUserLogin){
    res.render("signIn.ejs");
  }
  else {
    isUserLogin = false;
    res.render("compose.ejs");
  }
});

app.post("/compose", function(req,res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/home");
    }
    else{
      console.log(err);
    }
  });
});

app.get("/search",function(req,res){
  var posts,message;
  res.render("SnD.ejs",{posts:posts, message:message});
});

app.post("/search",function(req,res){
  var searchTitle=req.body.searchTitle;
  Post.find({ title: searchTitle}, function (err, post){
    if(!err) {
      if(post.length>0){
        var message="Here are all the posts with title: "+searchTitle;
        res.render("SnD.ejs", {posts:post,message,message});
      }
      else{
        var message="No post found with title: "+searchTitle;
        res.render("SnD.ejs", {posts:post,message,message});
      }
    }
  }); 
});

app.post("/deleteConfirm",function(req,res){
  var deleteId=req.body.deleteId;
  res.render("deleteConfirm.ejs",{deleteId:deleteId});
});



app.post("/delete",function(req,res){
  var deleteId=req.body.deleteId;
  var username = req.body.username;
  var password = req.body.password;
  Admin.findOne({ username: username}, function (err, foundAdmin){
    if(!err) {
      if(foundAdmin){
        if(foundAdmin.password===password){
          Post.deleteOne({ _id: deleteId}, function (err){
            if(!err) {
              var alert="Successfully deleted the post";
              res.render("alert.ejs", {alert:alert});
            }
          });
        }
        else{
          var alert="Wrong username or password";
          res.render("alert.ejs", {alert:alert});
        }
      }
      else{
        var alert="Wrong username or password";
        res.render("alert.ejs", {alert:alert});
      }
    }
  }); 
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
