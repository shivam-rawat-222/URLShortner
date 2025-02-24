const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortid: {
        type: String,
        unique: true,
        required: true
    },
    ActualUrl: {
        type: String,
        required: true
    },
    Users: [
        {
            time: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
