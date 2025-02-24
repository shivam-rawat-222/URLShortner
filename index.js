const express = require('express');
const app = express();
const { connectToMongoDb } = require("./Database/Connect");
const Urlmongo = require('./Models/Urls');
const path = require('path');
const env = require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

app.set('view engine', 'ejs');
const port = process.env.PORT || 2002; // Fix the bitwise OR issue (| → ||)
connectToMongoDb(process.env.MONGO_URL);
const urlrouter = require('./Routers/urlrouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// 🔹 Swagger Configuration
const swaggerOptions = {
    definition: { // Changed from `swaggerDefinition` to `definition`
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for all APIs in the app',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }], // Apply bearerAuth globally
        servers: [
            {
                url: process.env.APP_URL || "http://localhost:2002", // Fallback to localhost if APP_URL is missing
                description: 'Production server',
            },
        ],
    },
    apis: ['./Routers/*.js'], // Fixed incorrect path
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger-ui', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs.json', (req, res) => {
    res.send(swaggerDocs)
});


app.get("/", (req, res) => {
    res.redirect("/api-docs"); // Redirects to Swagger UI
});

app.use("/api", urlrouter);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Redirects a short URL to the original URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The short URL ID
 *     responses:
 *       302:
 *         description: Redirect to the actual URL
 *       404:
 *         description: Short URL not found
 */
app.get('/:id', async (req, res) => {
    try {
        let shortid = req.params.id;
        let data = await Urlmongo.findOne({ shortid });

        if (data) {
            return res.redirect(data.ActualUrl);
        } else {
            return res.status(404).json({ error: "Short URL not found" });
        }
    } catch (error) {
        console.error("Error fetching short URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
});
