const express = require("express");
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser, createUser } = require("../controllers/userController");

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;