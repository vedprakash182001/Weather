const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const hbs = require("hbs");

//path
const publicPath = path.join(__dirname,"../Public");
const templatePath = path.join(__dirname,"../template/views");
const partialPath = path.join(__dirname,"../template/partial");

hbs.registerPartials(partialPath);``
app.set("view engine","hbs")
app.set("views", templatePath);
app.use(express.static(publicPath));


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{ 
    res.render("about");
})

app.get("/weather",(req,res)=>{ 
    res.render("weather");
})

app.get("*",(req,res)=>{
    res.render ("404error");
})

app.listen(port,()=>{
    console.log("I am ready to launch");
})