const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    type: {
        type: String
    },
    address: {
        type: String, 
        required: true
    },
    floorsNumber: {
        type: Number, 
        required: true
    },
    responsibleName: {
        type: String                                                                                                                                                                                                                                                                                                                                                                                                                                           
    },
    responsibleNumber: {
        type: Number
    }
});

module.exports = mongoose.model('Site', siteSchema);