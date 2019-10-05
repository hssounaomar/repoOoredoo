const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipementTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    index: {
        type: Number
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    }
});

module.exports = mongoose.model('EquipementType', equipementTypeSchema);