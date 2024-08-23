const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    industry: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    contracts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    }]
});

module.exports = mongoose.model('Customer', CustomerSchema);