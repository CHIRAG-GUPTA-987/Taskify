const mongoose = require('mongoose');
const {Schema} = mongoose;
const notesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tag: {
        type: String,
        default: 'general'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;