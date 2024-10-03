const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortid: {
        type: String,
        unique : true
    },
    ActualUrl: {
        type: String,
        required: true
    },
    Users: [
        {
            time: {
                type: Number,
                
            }
        }
    ]
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
