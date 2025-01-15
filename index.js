const path= require("path");
const express = require("express");
const multer = require("multer");


const app = express();
const Port= 8002;
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        return cb(null, "/uploads")
    },
    filename:function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
}) 
const uploads = multer({storage:storage})


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:'false'}));

app.get("/", (req, res)=>{
    return res.render("homepage");
});

app.post('/upload',uploads.single('profileImage'), (req, res)=>{
    console.log(req.body);
    console.log(req.file);
    res.redirect("/");
});

app.listen(Port,()=>{console.log(`server started on Port: ${Port}`)});
