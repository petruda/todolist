// express for making backend app
import express from "express";
//bodyparser to check the entries, as middlewear for stuff
import bodyParser from "body-parser";
//dirname to be able to use the path on a server as well
import { dirname } from "path";
// to take the url of the root
import { fileURLToPath } from "url";
// to make the full fath ( root + localpath)
var todayItems = [];
var workItems = []
const __dirname = dirname(fileURLToPath(import.meta.url));
//what port the server uses
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get( "/", (req,res)=>{
    res.render(__dirname + "index.ejs", {
        itemsT: todayItems,
        itemG : "",
    });
});

app.post("/", (req,res)=>{
    var itemNameG = req.body["forg"];
    res.render(__dirname + "index.ejs",{
        itemsT: todayItems,
        itemG : itemNameG,
    });
    todayItems.push(itemNameG);
    console.log(todayItems.length);
});



app.get("/index.ejs", (req,res)=>{
    var itemNameG = req.body["forg"];
    res.render(__dirname + "index.ejs",{
        itemsT: todayItems,
        itemG : itemNameG,
    })
});

app.get("/worklist.ejs", (req, res)=>{
    res.render(__dirname + "worklist.ejs", {
        itemW : "",
        itemsW : workItems,
    });
});

app.post("/submitw", (req,res)=>{
    var itemNameW = req.body["forw"];
    workItems.push (itemNameW);
    res.render(__dirname + "worklist.ejs",{
        itemsW : workItems,
        itemW : itemNameW,
    });
    todayItems.push(itemNameW);
    console.log(workItems.length);
});

//server start and logging the port for safety
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
