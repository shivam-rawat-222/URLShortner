const express = require('express')
const app = express();
const port = 200;
const {connectToMongoDb} = require("./Database/Connect")
const Urlmongo = require('./Models/Urls')

app.set('view engine', 'ejs');

connectToMongoDb('mongodb+srv://rawat:rawat@rawatprojects.q0uwa.mongodb.net/?retryWrites=true&w=majority&appName=RawatProjects');

const urlrouter = require('./Routers/urlrouter')
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render('Home')
})
app.use("/api",urlrouter)

app.get('/:id',async(req,res)=>{
    let shortid = req.params.id;
    let redirect ;
    let data = await Urlmongo.findOne({shortid})
    if(data)
    {
        redirect = data.ActualUrl;
        res.redirect(redirect);
    }
    else{
        res.send("response is null")
    }
})

app.listen(port,()=>{
    console.log( `http://localhost:${port}`);
})