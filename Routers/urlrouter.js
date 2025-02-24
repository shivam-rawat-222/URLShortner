const express = require("express");
const urlrouter = express.Router();
const Url = require("../Models/Urls");
const shortid = require('shortid');

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Retrieve all stored URLs
 *     responses:
 *       200:
 *         description: A list of all shortened URLs
 */
urlrouter.get('/', async (req, res) => {
    // Fetch all stored URLs from the database
    var data = await Url.find({});
    res.json(data);
});

/**
 * @swagger
 * /api/url:
 *   post:
 *     summary: Create a short URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the shortened URL
 */
urlrouter.post('/url', async (req, res) => {
    let id = shortid.generate(); // Generate a unique short ID

    // Save the new short URL mapping in the database
    Url.create({
        shortid: id,
        ActualUrl: req.body.url
    }).then(() => { });

    res.json({
        url: `${process.env.APP_URL}/${id}`
    })
});

module.exports = urlrouter;
