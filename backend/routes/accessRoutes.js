const express = require("express");
const router = express.Router();
const { getAccessCodes, getAccessCode, updateAccessCode, deleteAccessCode, createAccessCode } = require("../controllers/accessController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route('/').get(getAccessCodes).post(createAccessCode);
router.route('/:id').get(getAccessCode).put(updateAccessCode).delete(deleteAccessCode);

module.exports = router;