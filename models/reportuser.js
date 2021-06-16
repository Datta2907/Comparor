const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportuserschema = new Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fraudname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('reportuser', reportuserschema);