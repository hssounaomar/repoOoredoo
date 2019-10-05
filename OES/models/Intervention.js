const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterventionSchema = new Schema({
    title: {
        type: String
    },
    periode: {
        type: Number
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    observation: {
        type: String
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date
    },
    state: {
        type: String,
        default: 'pending'
    },
    source: {
        type: String
    },
    failures: [{
        type: Schema.Types.ObjectId,
        ref: 'Failure'
    }],
    site: {
        type: Schema.Types.ObjectId,
        ref: 'Site'
    },
    equipement: {
        type: Schema.Types.ObjectId,
        ref: 'Equipement'
    },
    agents: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parts: [{
        type: Schema.Types.ObjectId,
        ref: 'Equipement'
    }]
});

module.exports = mongoose.model('Intervention', InterventionSchema);