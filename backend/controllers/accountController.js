const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/accountModel");

//@desc Register a user
//@route POST /api/accounts/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const accountAvailable = await Account.findOne({ email });
    if(accountAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const newAccount = await Account.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${newAccount}`);
    if(newAccount) {
        res.status(201).json({_id: newAccount.id, email: newAccount.email });
    } else {
        res.status(400);
        throw new Error("User data is not vaid");
    }
    res.json({message: "Register the user"});
});

//@desc Login user
//@route POST /api/accounts/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const account = await Account.findOne({ email });
    //compare password with hashedpassword
    if(account && (await bcrypt.compare(password, account.password))) {
        const accessToken = jwt.sign({
            account: {
                username: account.username,
                email: account.email,
                id: account.id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password not valid");
    }
});

//@desc Current user info
//@route GET /api/accounts/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.account);
});

module.exports = {registerUser, loginUser, currentUser};