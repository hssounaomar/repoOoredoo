const Intervention = require('../models/Intervention');

exports.getInterventions = (req, res) => {
    Intervention.find()
    .populate('supplier', 'firstName')
    .populate('site', 'name')
    .populate('equipement')
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.getIntervention =  (req, res) => {
    Intervention.findById(req.params.id)
    .then((data)=>{
        if(data) {
            res.send(data);
        } else {
            res.send('no such Intervention exist');
        }
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.addIntervention = (req, res) => {
    const intervention = new Intervention(req.body);
    intervention.save( (error, doc) => {
        doc
        .populate('site', 'name')
        .populate('supplier', 'firstName')
        .execPopulate()
        .then( data => {
            res.send(data);
        })
    })
};

exports.updateIntervention=  (req, res) => {
    const UpdateIntervention = req.body;
    Intervention.findOneAndUpdate({_id: req.params.id}, UpdateIntervention, {new:true})   
    .then( data =>{
        if(data) {
           res.send(data);
        } else {
            res.send('no such Intervention exist');
        }
    }).catch( error => {
       res.send(error);
    });
};
exports.updateStateOfIntervention=(req,res)=>{
    Intervention.findOneAndUpdate({_id: req.params.id},{$set:{state:req.body.state,failures:req.body.failures,observation:req.body.observation}}, {new:true})
    .then( data => {
        if(data) {
            res.send(data);
        } else {
            res.send("no such Intervention exist");
        }
    }).catch( error =>{
        res.send(error);
    });
}
exports.completeIntervention=(req,res)=>{
    Intervention.findOneAndUpdate({_id: req.params.id},{$set:{state:"cloturer"}}, {new:true})
    .then( data => {
        if(data) {
            res.send(data);
        } else {
            res.send("no such Intervention exist");
        }
    }).catch( error =>{
        res.send(error);
    });
}
exports.deleteIntervention =  (req, res) => {
    Intervention.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            res.send(data);
        } else {
            res.send("no such Intervention exist");
        }
    }).catch( error =>{
        res.send(error);
    });
}