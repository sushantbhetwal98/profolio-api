const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('professional', professionalSchema);