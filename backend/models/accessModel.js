const mongoose = require("mongoose");

const acessSchema = mongoose.Schema({
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Account",
    },
    name: {
        type: String,
        required: [true, "Please add the user fullname"],
    },
    accessCode: {
        type: String,
        required: [true, "Please add the user username"],
    }, 
    details: {
        type: String,
        required: [false],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Access", acessSchema);