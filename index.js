const express = require('express')
const app = express();
const { connectToMongoDb } = require("./Database/Connect")
const Urlmongo = require('./Models/Urls')
const env = require("dotenv").config();
app.set('view engine', 'ejs');
const port = process.env.PORT | 2002;
connectToMongoDb(process.env.MONGO_URL);
const urlrouter = require('./Routers/urlrouter')
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render('Home')
})
app.use("/api", urlrouter)

app.get('/:id', async (req, res) => {
    let shortid = req.params.id;
    let redirect;
    let data = await Urlmongo.findOne({ shortid })
    if (data) {
        redirect = data.ActualUrl;
        res.redirect(redirect);
    }
    else {
        res.send("response is null")
    }
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})