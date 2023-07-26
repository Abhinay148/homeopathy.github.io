const mongoose = require('mongoose')
const { Schema } = mongoose

const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
    ,
    time: {
        type: String,
        required: true
    }
    , phone: {
        type: Number,
        required: true
    },
    pdf: [{
        type: String,
    }]
});

module.exports = mongoose.model('Notes', notesSchema)