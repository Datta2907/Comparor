const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneschema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    reports: [{
        user: {
            type: Schema.Types.ObjectId
        },
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
        phname: {
            type: String,
            required: true
        }
    }],
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    launch: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    sims: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    resolution: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    chipset: {
        type: String,
        required: true
    },
    gpu: {
        type: String,
        required: true
    },
    cpu: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    frontcamera: {
        type: String,
        required: true
    },
    backcamera: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },

    battery: {
        type: String,
        required: true
    },
    colors: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('phone', phoneschema);