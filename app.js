//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const date = require(__dirname+"/date.js");
const mongoose = require("mongoose");
var lod = require('lodash');
mongoose.connect("mongodb+srv://admin-rutvik:rutvik123@cluster0-7bz7h.mongodb.net/todolistDB",{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false});
mongoose.connect("mongodb//localhost:27010//todolistDB",{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false});
const Itemschema = mongoose.Schema({
  name:{
    type:String,

  }
});
const Item = mongoose.model("Item",Itemschema);

const item1 = new Item({
  name:"Welcome to your list"
}) ;
/*const item2 = new Item({
  name:"Brush your teeth"
}) ;
const item3 = new Item({
  name:"Drink Tea"
}) ;*/
//item3.save();
 const Listschema = mongoose.Schema({
   name:String,
   items:[Itemschema]
 });
const List = mongoose.model("List",Listschema);

console.log(date);
const app =express();
 var items = ["collectt","make","eat"];
 var work=[];
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  /*if(currentday===6 || currentday===0)
  {
    day=weekdays[currentday];
    res.render("list",{tday: day});
  }
  else {
    day=weekdays[currentday];
    res.render("list.ejs",{tday: day});
  }*/
  Item.find(function(err,items){
    if(items.length==0){
      Item.insertMany([item1],function(err){
        if(err){
          console.log(err);
        }
        else {
          console.log("success");}
      });
      res.redirect("/");
    }
    else{
      console.log(items);
    res.render("list",{list_title:"Today" ,newItems:items});}
  });

  currentday=date.getday();


});
app.get("/:cusliname",function(req,res){
  const cusname = lod.capitalize(req.params.cusliname);
  console.log("In cusliname");
  console.log(cusname);
  List.findOne({name:cusname},function(err,foundlist){
    if(!err){
      console.log(foundlist);
      if(!foundlist){
        cuslist = new List({
          name:cusname,
          items:[item1]
        });
        cuslist.save();
        res.redirect("/"+cusname);
      }
      else {
         res.render("list",{list_title:foundlist.name ,newItems:foundlist.items})
        }
      }
    });


});

app.get("/about",function(req,res){
  res.render("about");
})


app.post("/",function(req,res){
  /*if(req.body.list=="work")
  {
    work.push(req.body.newItem);
    res.redirect("/work");
  }else{
  items.push(req.body.newItem);*/
  const TempItem =req.body.newItem;
  const listname = req.body.list;
  console.log(listname);
  newItem = new Item({
    name:TempItem
  });
  if(listname=="Today"){

    newItem.save();
    res.redirect("/")
  }
  else {
    List.findOne({name:listname},function(err,foundlist){
      foundlist.items.push(newItem);
      foundlist.save();
      res.redirect("/"+listname);
    });
  }



});


app.post("/delete",function(req,res){
  delitem=req.body.checkbox;
  dellist=req.body.listname;
  if(dellist=="Today"){
    Item.findByIdAndRemove(delitem,function (err) {
      if(!err){
        console.log("successfully deleted");
      }

    });
    res.redirect("/");
  }else{
  List.findOneAndUpdate({name:dellist},{$pull:{items:{_id:delitem}}},function(err){
    if(!err)
    {
      console.log("succcessss");
    }
    res.redirect("/"+dellist);
  });
}

});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running");
})
