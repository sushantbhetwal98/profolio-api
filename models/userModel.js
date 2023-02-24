const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
})

userSchema.statics.signup = async function (firstName, lastName, email, password) {
    // check if all fields are filled
    if (!firstName || !lastName || !email || !password) {
        throw Error("All fields are required")
    }


    // validation of inputs
    if (!validator.isLength(firstName, { min: 3 })) {
        throw Error("First name must be atleast 3 character long")
    }
    if (!validator.isLength(lastName, { min: 3 })) {
        throw Error("last name must be atleast 3 character long")
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    // if email is already in use

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }

    // hash the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    // enter the user in the database
    const user = await this.create({ firstName, lastName, email, password: hash })

    return user;
}

userSchema.statics.login = async function (email, password) {

    // check if the formed is filled
    if (!email || !password) {
        throw Error("Plese enter your credentials")
    }
    // check if the email exist in the database
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Invalid Credentials");
    }

    // check if the pasword matches
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
        throw Error("Invalid Credentials")
    }
    return user;
}

module.exports = mongoose.model('User', userSchema)