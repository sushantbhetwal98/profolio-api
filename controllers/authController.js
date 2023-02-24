const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET)
}

const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.signup(firstName, lastName, email, password);
        // create a token 
        const token = createToken(user._id);
        res.status(200).json({ firstName, lastName, email, token })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id);
        res.status(200).json({ firstname: user.firstName, lastName: user.lastName, email: user.email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signup, login }