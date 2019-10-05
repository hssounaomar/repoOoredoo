const Failure = require('../models/Failure');

exports.getFailures = (req, res) => {
    Failure.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.getFailure =  (req, res) => {
    Failure.findById(req.params.id)
    .then((data)=>{
        if(data) {
            res.send(data);
        } else {
            res.send('no such Failure exist');
        }
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.addFailure = (req, res) => {
    const NewType = new Failure(req.body);
    NewType.save()
    .then((data)=> {
        res.send(data)
    })
    .catch((error)=> {
        res.send(error)
    });
};

exports.updateFailure=  (req, res) => {
    const UpdateFailure = req.body;
    Failure.findOneAndUpdate({_id: req.params.id}, UpdateFailure, {new:true})   
    .then( data =>{
        if(data) {
           res.send(data);
        } else {
            res.send('no such Failure exist');
        }
    }).catch( error => {
       res.send(error);
    });
};

exports.deleteFailure =  (req, res) => {
    Failure.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            res.send(data);
        } else {
            res.send("no such Failure exist");
        }
    }).catch( error =>{
        res.send(error);
    });
}