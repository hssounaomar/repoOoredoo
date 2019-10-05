const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipementSchema = new Schema({
    reference: {
        type: String
    },
    state: {
        type: String, 
        required: true,
        default: "en service"
    },
    price: {
        type: Number
    },
    brand : {
        type: String, 
        required: true
    },
    model: {
        type: String, 
        required: true
    },
    qrCode: {
        type: Number,
        unique: true,
        sparse: true
    },
    ip: {
        type: String
    },
    comment: {
        type: String
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    site:{
        type: Schema.Types.ObjectId, 
        ref: 'Site',
        required: true
    },
    installationDate :{
        type: Date,
        default: Date.now
    },
    history: [
        {
            installationDate: {
                type: Date,
                default: Date.now
            },
            removalDate: {
                type: Date
            },
            floor: {
                type: Number
            },
            site: {
                type: Schema.Types.ObjectId, 
                ref: 'Site',
                required: true
            }
        }
    ],
    parents: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Equipement' 
        }
    ],
    category: 
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Category'
        },
    type :
        { 
            type: Schema.Types.ObjectId, 
            ref: 'EquipementType',
            required: true 
        },
    attachements : [
        {
            format : String,
            url: String
        }
    ]
});

module.exports = mongoose.model('Equipement', equipementSchema);