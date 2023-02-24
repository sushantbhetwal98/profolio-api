const Profession = require('../models/professionalModel');
const validator = require('validator');
const mongoose = require('mongoose')

// validating the professional input
const validate = (user_id, fullName, address, work, email, phone, description) => {

    if (!fullName || !address || !work || !email || !phone || !description) {
        throw Error('All the fields are required')
    }

    if (!validator.isEmail(email)) {
        throw Error("Not a valid Email")
    }
    if (!validator.isMobilePhone(phone)) {
        throw Error("Not a valid Phone Number")
    }
    const professional = { user_id, fullName, address, work, email, phone, description };
    return professional;

}

// Creating Professionals
const createProfessional = async (req, res) => {
    const { fullName, address, work, email, phone, description } = req.body;
    const user_id = req.user._id;
    try {
        // valiadate if the entered email and phonenumber is valid
        const valid = validate(user_id, fullName, address, work, email, phone, description)

        // create if valid
        const professional = await Profession.create(valid);
        res.status(200).json({ message: "Created Successfully", professional })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Reading Professionals

const getProfessionals = async (req, res) => {
    const user_id = req.user._id;
    const professionals = await Profession.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(professionals)
}

// Reading a single Professional
const getProfessional = async (req, res) => {
    const { id } = req.params
    const user_id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Content Unavailable' })
    }

    const professional = await Profession.findById(id)

    if (!professional) {
        return res.status(404).json({ error: 'This content is not available right now' })
    }

    if (professional.user_id !== user_id) {
        return res.status(401).json({ error: 'Resource access denied' })
    }

    res.status(200).json(professional)
}

// Deleting a professional
const deleteProfessional = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Content Unavailable' })
    }

    const exist = await Profession.findById(id)

    if (!exist) {
        return res.status(404).json({ error: 'This content is not available right now' })
    }

    if (exist.user_id != user_id) {
        return res.status(401).json({ error: 'Resource access denied' })
    }

    const professional = await Profession.findOneAndDelete({ _id: id })

    res.status(200).json({ message: "Deleted Successfully", professional })

}

// updating professional
const updateProfessional = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Content Unavailable" })
    }

    const exist = await Profession.findById(id)

    if (!exist) {
        return res.status(404).json({ error: 'This content is not available right now' })
    }

    console.log(user_id);
    if (exist.user_id != user_id) {
        return res.status(401).json({ error: 'Resource access denied' })
    }

    const professional = await Profession.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    res.status(200).json({ message: "Updated Successfully", professional })
}

module.exports = { createProfessional, getProfessionals, getProfessional, deleteProfessional, updateProfessional }