    //jshint esversion:6

    const express=require("express");
    const bodyParser=require("body-parser");

    const app=express();

    var items=["eat","sleep","repeat"];

    var workitems=[];

    app.set('view engine' , 'ejs');

    app.use(bodyParser.urlencoded({extended:true}));

    app.use(express.static("public"));


    app.get("/", function(req,res){
        const today = new Date();
        const options={
            weekday:"long",
            date:"numeric",
            month:"long"
        };

        const day= today.toLocaleDateString("en-US", options);

        res.render("list", {listTitle:day, newlistitems:items});
    });

    app.get("/work", function(req,res){

        res.render("list" , {listTitle:"work list", newlistitems:workitems});

    });

    app.post("/work", function(req,res){
        var item=req.body.newItem;
        workitems.push(item);
        res.redirect("/work");

    })


    app.post("/", function(req,res){
        var item=req.body.newItem;
        if(req.body.list === "work"){
            res.redirect("/home");
            workitems.push(item);   

        }

        else{
            items.push(item);
            res.redirect("/");
        }


    });

    app.get("/about", function(req,res){
        
       res.render("about");
    })


    app.listen(3000,function(req,res){

        console.log("Server is running on port 3000");

    });