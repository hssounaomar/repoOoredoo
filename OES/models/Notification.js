const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    intervention: {
        type: Schema.Types.ObjectId,
        ref: 'Intervention'
    },
    message: {
        type: String
    },
    views: [
        {   
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    date: {
        type:Date,
        default: Date.now
    },
    state: {
        type: String
    },
    SupplierExists: {
        type:Boolean
    }
})

module.exports = mongoose.model('Notification', NotificationSchema);