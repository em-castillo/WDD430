const mongoose = require("mongoose");

const childSchema = mongoose.Schema({
    id: { type: String, require: true} ,
    name: { type: String },
    description: { type: String },
    url: { type: String, required: true },
});

const documentSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    description: { type: String },
    url: { type: String, required: true },
    children: { type: childSchema }
});


module.exports = mongoose.model("Document", documentSchema);