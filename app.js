const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent= "I am home staring Content"
const aboutContent = "I am about starting content";
const contactContent = "I am contact content";

let posts = []


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home", {
        startText :homeStartingContent, 
        posts : posts
    });

});

app.get("/about", function (req,res){
    res.render("about", {startText : aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("about", {startText : contactContent});
})

app.get("/compose", function (req, res){
    res.render("compose" );
});


app.post("/compose", function (req, res){
    var title = req.body.postTitle
    var post = req.body.postContent
    const published = {
        title : title,
        content : post,
    }

    posts.push(published);
    res.redirect("/");

});

app.get("/posts/:post", function (req, res){
    const requestedTitle = req.params.post;
    const reqUpper = _.lowerCase(requestedTitle);

    posts.forEach(function (post){
        const storedTitle = post.title;
        const storedLower = _.lowerCase(storedTitle);
        if (reqUpper === storedLower){
            res.render("post", {
                title : post.title, 
                content: post.content
            });

            console.log("Match Found");
        }else {
            console.log("Match not found")
        }
    });


});






app.listen(3000, function(){
    console.log("App running on PORT 3000");
})