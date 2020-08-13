const express= require("express");
const app = express();
const bodyParser =require("body-parser")
const connection = require("./database/database");

const CategoriesControler = require("./categories/CategoriesControler");
const ArticlesControler = require("./articles/ArticlesControler")

const Article = require("./articles/Article");
const Category = require("./categories/Category")

//viewnpm 

app.set('view engine','ejs');

//static

app.use(express.static('public'))

//body parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//database

connection
   .authenticate()
   .then(()=>{
    console.log("conexão feita com sucesso!")
   }).catch((error)=>{
       console.log(error)
   })

   //categories
 app.use("/", CategoriesControler); 

//artigos
app.use("/", ArticlesControler);

app.get("/", (req, res )=> {
    res.render("index")
})

    app.listen(5000, () => {
        console.log("Servidor rodando de boa");
    });