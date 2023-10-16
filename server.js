// express for making backend app
import express from "express";
//bodyparser to check the entries, as middlewear for stuff
import bodyParser from "body-parser";
//dirname to be able to use the path on a server as well
import { dirname } from "path";
// to take the url of the root
import { fileURLToPath } from "url";
// to make the full fath ( root + localpath)

//dosen't do anything, but it was supposed to
const __dirname = dirname(fileURLToPath(import.meta.url));
//what port the server uses
const app = express();
const port = 3000;
//to include static files
app.use(express.static("public"));
//to acces body element
app.use(bodyParser.urlencoded({ extended: true }));
//for defining ejs as viewing engine
app.set("view engine", "ejs");
// strats here empty arrays for items for the lists
var todayItems = [];
var workItems = [];
//ends here

//when accesing the site load the to do list without any items
app.get("/", (req,res)=>{
    res.render("index.ejs", {
        itemsT: todayItems,
        itemG : "",
    });
});
// to post items in todays to do list
app.post("/", (req,res)=>{
    var itemNameG = req.body["forg"];
    res.render("index.ejs",{
        itemsT: todayItems,
        itemG : itemNameG,
    });
    todayItems.push(itemNameG);
    console.log(todayItems.length);
});

// for the today s list button

app.get("/index.ejs", (req,res)=>{
    var itemNameG = req.body["forg"];
    res.render("index.ejs",{
        itemsT: todayItems,
        itemG : itemNameG,
    })
});
// for the worklist button
app.get("/worklist.ejs", (req, res)=>{
    res.render("worklist.ejs", {
        itemW : "",
        itemsW : workItems,
    });
});
// to post items in the work list
app.post("/submitw", (req,res)=>{
    var itemNameW = req.body["forw"];
    workItems.push (itemNameW);
    res.render("worklist.ejs",{
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
//end