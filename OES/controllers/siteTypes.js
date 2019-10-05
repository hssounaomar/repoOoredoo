const SiteType = require('../models/SiteType');

exports.getSiteTypes = (req, res) => {
    SiteType.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.getSiteType =  (req, res) => {
    SiteType.findById(req.params.id)
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

exports.addSiteType = (req, res) => {
    const NewType = new SiteType(req.body);
    NewType.save()
    .then((data)=> {
        res.send(data)
    })
    .catch((error)=> {
        res.send(error)
    }) 
};

exports.updateSiteType =  (req, res) => {
    const UpdateType = req.body;
    SiteType.findOneAndUpdate({_id: req.params.id}, UpdateType, {new:true})   
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

exports.deleteSiteType =  (req, res) => {
    SiteType.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            res.send(data)
        } else {
            res.send("no such user exist");
        }
    }).catch( error =>{
        res.send(error);
    });
}