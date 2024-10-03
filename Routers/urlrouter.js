const express = require("express")
const urlrouter = express.Router();
const Url = require("../Models/Urls");
const shortid = require('shortid');

urlrouter.get('/',async (req,res)=>{

    var data =await Url.find({});
    res.json(data);
})

urlrouter.post('/url',async (req,res)=>{
    let id = shortid.generate();
    Url.create({
        shortid:id,
        ActualUrl:req.body.url
    }).then(()=>{})
    res.render("Home",{
        url:id
    })
})

module.exports = urlrouter