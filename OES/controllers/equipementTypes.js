const EquipementType = require('../models/EquipementType');

exports.getEquipementTypes = (req, res) => {
    EquipementType.find()
    .populate('category')
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.getEquipementType =  (req, res) => {
    EquipementType.findById(req.params.id)
    .then((data)=>{
        if(data) {
            res.send(data);
        } else {
            res.send('no such type exist');
        }
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.addEquipementType = (req, res) => {
    const NewType = new EquipementType(req.body);
    NewType.save()
    .then((data)=> {
        res.send(data)
    })
    .catch((error)=> {
        res.send(error)
    }) 
};

exports.updateEquipementType =  (req, res) => {
    const UpdateType = req.body;
    EquipementType.findOneAndUpdate({_id: req.params.id}, UpdateType, {new:true})   
    .then( data =>{
        if(data) {
           res.send(data);
        } else {
            res.send('no such type exist');
        }
    }).catch( error => {
       res.send(error);
    });
};

exports.deleteEquipementType =  (req, res) => {
    EquipementType.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            res.send(data);
        } else {
            res.send("no such user exist");
        }
    }).catch( error =>{
        res.send(error);
    });
};