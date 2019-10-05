const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FailureSchema = new Schema({
    name :{
        type:String,
        required:true,
        unique:true
    },
    description :{
        type:String
    }
})
module.exports = mongoose.model('Failure', FailureSchema);