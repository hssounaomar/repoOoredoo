const path = require('path');
const fs = require('fs')
const uploadFile = require('../utilities/uploadFile');
const Equipement = require('../models/Equipement');
const EquipementType = require('../models/EquipementType');
const public = `${__basedir}/client/public`;

exports.getEquipements = (req, res) => {
    Equipement.find()
    .populate('type', 'name')
    .populate('site', 'name')
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.getEquipement = (req, res) => {
    Equipement.findById(req.params.id)
    .then( data =>{
        if(data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
                message: 'Cette identifiant ne correspond à aucun equipement'
            })
        }
    })
    .catch((error)=>{
        res.send(error);
    });
};

let upload = uploadFile.upload({
    destination : `${public}/uploads`,
    maxSize : 1024 * 1024 * 5,
    fileTypes : ["png", "jpg", "pdf"],
})

upload = upload.array('files', 12)

exports.addEquipement = (req, res) => {
    upload( req, res,  (err) => {
        if(err) {
            res.send(err)
        }
        else {
            EquipementType.findOneAndUpdate(req.body.type, {$inc : {index: 1}}, {new:true}, (error, doc) => {
                let attachements = [];
                if ( req.files ) {
                    req.files.forEach( file => {
                        attachements.push({url: `uploads/${file.filename}`, format: path.extname(file.originalname).slice(1).toUpperCase()});
                    })
                } else if(req.body.url) {
                    let attachements = [];
                    attachements.push({url: req.body.url});
                }
                delete req.body.url;
                let NewEquipement = {
                    ...req.body,
                    attachements,
                    reference: doc.name.substring(0, 3).toUpperCase() + doc.index
                }
                NewEquipement = new Equipement(NewEquipement);
                NewEquipement.save((error, doc) => {
                    doc.populate('site', 'name').populate('type', 'name').execPopulate()
                    .then( doc => {
                        res.send(doc);
                    })
                    .catch( error => {
                        res.send(error)
                    }) 
                })
            })
        }
    })
}

exports.updateEquipement = (req, res) => {
    upload( req, res,  (err) => {
        if(err) {
            res.send(err)
        }
        else {
            
            
            let attachements = [];
            if(req.body.attachements !== undefined) {
                attachements = JSON.parse(req.body.attachements);
            }
            if ( req.files !== undefined ) {
                req.files.forEach( file => {
                    attachements.push({url: `uploads/${file.filename}`, format: path.extname(file.originalname).slice(1).toUpperCase()});
                })
            } else if(req.body.url !== undefined) {
                attachements.push({url: req.body.url});
            }
            let toDelete = [];
            if(req.body.toDelete !== undefined) {
                toDelete = req.body.toDelete
            }
            delete req.body.url;
            delete req.body.toDelete;
            let Update = {
                ...req.body,
                attachements,
            }
            Equipement.findOneAndUpdate({_id: req.params.id}, Update, {new:true})   
            .then( data => {
                if(data) {
                    if(toDelete.length !== 0) {
                        toDelete.forEach( url => {
                            fs.unlink(`${public}/${url}`)
                        })
                    }
                    res.send(data)
                } else {
                    res.send('Identifiant invalide')
                }
            }).catch( error => {
                res.send(error);
            })
        }
    })
};

exports.deleteEquipement = (req, res) => {
    Equipement.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            if(data.attachements.length !== 0) {
                data.attachements.forEach( doc => {
                    fs.unlink(`${public}/${doc.url}`) 
                })
            }
            res.send(data)
        } else {
            res.json({
                success: false,
                message: 'Cette identifiant ne correspond à aucun equipement'
            })
        }
    }).catch( error =>{
        res.send(error);
    });
}