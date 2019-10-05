const Site = require('../models/Site');

exports.getSites = (req, res) => {
    Site.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.getSite =  (req, res) => {
    Site.findById(req.params.id)
    .then((data)=>{
        if(data) {
            res.send(data);
        } else {
            res.send('no such Site exist');
        }
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.addSite = (req, res) => {
    const NewType = new Site(req.body);
    NewType.save()
    .then((data)=> {
        res.send(data)
    })
    .catch((error)=> {
        res.send(error)
    });
};

exports.updateSite =  (req, res) => {
    const UpdateSite = req.body;
    Site.findOneAndUpdate({_id: req.params.id}, UpdateSite, {new:true})   
    .then( data =>{
        if(data) {
           res.send(data);
        } else {
            res.send('no such Site exist');
        }
    }).catch( error => {
       res.send(error);
    });
};

exports.deleteSite =  (req, res) => {
    Site.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            res.send(data);
        } else {
            res.send("no such Site exist");
        }
    }).catch( error =>{
        res.send(error);
    });
}