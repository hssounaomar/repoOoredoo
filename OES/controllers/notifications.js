const Notification = require('../models/Notification');

exports.getNotifications = (req, res) => {
    Notification.find()
    .populate({
        path: 'intervention',			
        populate: { 
            path:  'supplier site'
        }
      })
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.getNotification =  (req, res) => {
    Notification.findById(req.params.id)
    .then((data)=>{
        if(data) {
            res.send(data);
        } else {
            res.send('no such Notification exist');
        }
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.addNotification = (notification, io) => {
    const NewNotification = new Notification(notification);
    NewNotification.save()
    .then( data => {
        io.sockets.emit('notification', data)
    })
    .catch( error => {
        res.send(error)
    });
}

exports.updateNotification=  (req, res) => {
    const UpdateNotification = req.body;
    Notification.findOneAndUpdate({_id: req.params.id}, UpdateNotification, {new:true})   
    .then( data =>{
        if(data) {
           res.send(data);
        } else {
            res.send('no such Notification exist');
        }
    }).catch( error => {
       res.send(error);
    });
};

exports.deleteNotification =  (req, res) => {
    Notification.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            res.send(data);
        } else {
            res.send("no such Notification exist");
        }
    }).catch( error =>{
        res.send(error);
    });
}