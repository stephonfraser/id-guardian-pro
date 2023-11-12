const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the user fullname"],
    },
    username: {
        type: String,
        required: [true, "Please add the user username"],
    }, 
    email: {
        type: String,
        required: [true, "Please add the user email address"],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);