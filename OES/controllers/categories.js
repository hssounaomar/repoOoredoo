const Category = require('../models/Category');

exports.getCategories = (req, res) => {
    Category.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.send(error);
    });
};

exports.getCategory = (req, res) => {
    Category.findById(req.params.id)
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

exports.addCategory = (req, res) => {
    const NewType = new Category(req.body);
    NewType.save()
    .then((data)=> {
        res.send(data)
    })
    .catch((error)=> {
        res.send(error)
    }) 
};

exports.updateCategory = (req, res) => {
    const UpdateType = req.body;
    Category.findOneAndUpdate({_id: req.params.id}, UpdateType, {new:true})   
    .then( data =>{
        if(data) {
           res.send(data);
        } else {
            res.send('no such type exist');
        }
    }).catch( error => {
       res.send(error);
    });
}

exports.deleteCategory = (req, res) => {
    Category.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            res.send(data);
        } else {
            res.send("no such user exist");
        }
    }).catch( error =>{
        res.send(error);
    });
}