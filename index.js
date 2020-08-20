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
app.use("/",CategoriesControler); 
//artigos
app.use("/",ArticlesControler);

app.get("/", (req, res ) => {
    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories=>{ 
        res.render("index", {articles: articles, categories:categories});
    });
    });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
        slug: slug
    }
  }).then(article => {
      if(article != undefined){
        Category.findAll().then(categories=>{ 
            res.render("article", {article: article, categories:categories});
        });      }else{
        res.redirect("/")
      }
  }).catch(err => {
    res.redirect("/")
  })
});

    app.listen(5000, () => {
        console.log("Servidor rodando de boa");
    });