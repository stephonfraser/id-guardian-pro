const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

//@desc Create new users
//@route POST /api/users
//@access public
const createUser = asyncHandler(async (req, res) => {
    console.log("The Request Body Is: ",req.body);
    const {name, username, email} = req.body;
    if (!name || !username || !email) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.create({
        name,
        username,
        email
    });

    res.status(201).json(user);
});

//@desc Get individual user
//@route GET /api/users/:id
//@access public
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(`Getting user ${req.params.id}.`);
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

//@desc Update individual user
//@route PUT /api/users/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(`Finding user ${req.params.id} for update.`);
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedUser);
});

//@desc Delete individual user
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(`Deleting user ${req.params.id}.`);
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    console.log("Record removed.");
    res.status(200).json(deletedUser);
});

module.exports = {getUsers, createUser, getUser, updateUser, deleteUser};