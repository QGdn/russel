const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catway = new Schema({
    catwaysNumber: {
        type: Number,
        required: [true, 'Le numéro de la voie est requis'],
        unique: true
    },
    catwaysType: {
        type: String,
        required: [true, 'Le type de la voie est requis'],
        value: ['short', 'long']
    },
    catwaysState: {
        type: String,
        required: [true, 'L\'état de la voie est requis']
    }, 
    } , {
        timestamps: true
    });

    mongoose.exports = mongoose.model('Catway', catway);
