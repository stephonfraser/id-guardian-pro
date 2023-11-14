const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Access = require("../models/accessModel");

//@desc Get all access codes
//@route GET /api/access
//@access private
const getAccessCodes = asyncHandler(async (req, res) => {
    const accessCodes = await Access.find({account_id: req.account.id});
    res.status(200).json(accessCodes);
});

//@desc Create access codes
//@route POST /api/access
//@access private
const createAccessCode = asyncHandler(async (req, res) => {
    console.log("The Request Body Is: ",req.body);
    const {name, accessCode, details} = req.body;
    if (!name || !accessCode) {
        res.status(400);
        throw new Error("Name and code are mandatory!");
    }

    const hashedAccessCode = await bcrypt.hash(accessCode, 10);
    console.log("Hashed Access Code: ", hashedAccessCode);

    const newAccessCode = await Access.create({
        name,
        accessCode: hashedAccessCode,
        details,
        account_id: req.account.id,
    });

    res.status(201).json(newAccessCode);
});

//@desc Get individual access code
//@route GET /api/access/:id
//@access private
const getAccessCode = asyncHandler(async (req, res) => {
    const accessCode = await Access.findById(req.params.id);
    console.log(`Getting access code ${req.params.id}.`);
    if(!accessCode) {
        res.status(404);
        throw new Error("Access code not found");
    }
    res.status(200).json(accessCode);
});

//@desc Update individual access code
//@route PUT /api/access/:id
//@access private
const updateAccessCode = asyncHandler(async (req, res) => {
    const accessCode = await Access.findById(req.params.id);
    console.log(`Finding user ${req.params.id} for update.`);
    if(!accessCode) {
        res.status(404);
        throw new Error("Access code not found");
    }

    if(accessCode.account_id.toString() !== req.account.id) {
        res.status(403);
        throw new Error("User do not have permission to update other user access codes.");
    }

    const updatedAccessCode = await Access.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedAccessCode);
});

//@desc Delete individual access code
//@route DELETE /api/access/:id
//@access private
const deleteAccessCode = asyncHandler(async (req, res) => {
    const accessCode = await Access.findById(req.params.id);
    console.log(`Deleting access code ${req.params.id}.`);
    if(!accessCode) {
        res.status(404);
        throw new Error("Access code not found");
    }

    if(accessCode.account_id.toString() !== req.account.id) {
        res.status(403);
        throw new Error("User do not have permission to delete other user's access codes.");
    }

    const deletedAccessCode = await Access.findByIdAndDelete(req.params.id);
    console.log("Record removed.");
    res.status(200).json(deletedAccessCode);
});

module.exports = {getAccessCode, getAccessCodes, createAccessCode, updateAccessCode, deleteAccessCode};