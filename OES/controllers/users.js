const User = require('../models/User');
const bcrypt = require('bcryptjs');
const uploadFile = require('../utilities/uploadFile');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');

const upload = uploadFile.upload({
    destination : './uploads',
    maxSize: 1024 * 1024 * 3,
    fileTypes: ["png", "jpg"],
    inputName: "file"
})


exports.setProfilePicture = (req, res) => {
    upload(req, res, (err) => {
        if(err.code === 'LIMIT_FILE_SIZE') {
            const response = {
                message: 'Fichier trop volumineux',
                success: false
            }
            res.end(response);
        }
        if(req.fileValidationError) {
            const message = {
                message: req.fileValidationError,
                success: false
            }
            return res.end(message);
        }
        User.findOneAndUpdate({_id: req.params.id}, {$set: {image: req.file.path}}, {new:true})
        .then( data => {
            res.json({
                success: true,
                data: data,
                message: 'image ajoutée avec succés'
            })
        }).catch ( error => {
            res.status(400).send(error)
        })
    })
}

exports.getUsers = (req, res) => {
    User.find()
    .then( data =>{
        res.send(data)
    })
    .catch( error =>{
        res.send(error);
    });
};

exports.getUser =  (req, res) => {
    User.findById(req.params.id)
    .then( data => {
        if(data) {
            res.send(data)
        } else {
            res.status(400).send('Aucun compte trouvé')
        }
    })
    .catch( error =>{
        res.send(error);
    });
};

exports.getUserByToken =  (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then( data => {
        if(data) {
            res.send(data)
        } else {
            res.status(404).send('Aucun utilisateur trouvé')
        }
    })
    .catch( error =>{
        res.status(400).send(error);
    });
};

exports.getUsersByRole =  (req, res) => {
    User.find({role : req.params.role})
    .then( data => {
        if (data) {
            res.send(data)
        } else {
            res.status(400).send('Aucun compte trouvé')
        }
    })
    .catch( error =>{
        res.send(error);
    });
};


exports.invite = async (req, res) => {

    // Check email Validity
    if(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(req.body.email)) 
        return res.status(400).send('Adresse email invalide');


    // Token Containing the address and the role of the receiver
    const token = jwt.sign(
        { 
            receiver: req.body.email,
            role: req.body.role
        },
        config.get('jwtSecret'),
        {expiresIn: '1d'}
    );
    const client = config.get('clientURL');
    const link = `http://localhost:3000/signup`

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(config.transporter);

    const messageOptions = {
        from: '"Ooredoo Electronic Security Service" <foo@example.com>',
        to: req.body.email,
        cc: config.transporter.auth.user,
        subject: "Invitation",
        html: `<p>Le service de sécurité électronique vous invite à rejoindre son plateforme</p>
               </br>
               <a href="${link}">Accepter l'invitation</a>
               ` 
    }

    // send mail with defined transport object
    await transporter.sendMail(messageOptions, (error) => {
        if(error) {
            res.status(error.responseCode).send(error.response)
            /* console.log(error) */
            /* if(error.responseCode === 535) {
                res.status(535).send('Problème d\'authentification, veuillez verifier les paramètres de votre compte email')
            } */
            
        } else { 
            res.send('Invitation envoyée avec succès')
        }
    });
}

exports.verifyToken = (req, res) => {
    const data = {
        email: req.user.receiver,
        role: req.user.role
    }
    res.status(200).send(data);
}

exports.registerUser = (req, res) => {
    if(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(req.body.email)) 
        return res.status(400).send('Adresse email invalide');

    if(req.body.password !== req.body.passwordConfirmation) 
        return res.status(400).send('Le mot de passe ne correspond pas');

    bcrypt.genSalt(10, (err, salt) =>  {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if( err ) {
                res.send(err);
            } else {
                delete req.body.passwordConfirmation; 
                new User({
                    ...req.body,
                    password: hash
                })
                .save()
                .then( user => {
                    const token = jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        {expiresIn: 3600},
                    )
                    res.json({
                        token,
                        user,
                        message: 'Compte crée avec succés'
                    })
                })
                .catch( error => {
                    res.status(400).send(error.message)
                }) 
            }
        });
    })
};

exports.updateUser =  (req, res) => {
    const UpdateUser = req.body;
    User.findOneAndUpdate({_id: req.params.id}, UpdateUser, {new:true})   
    .then( data =>{
        if(data) {
            res.json(data)
        } else {
            res.status(400).send('Cette identifiant ne correspond à aucun utilisateur')
        }
    }).catch( error => {
       res.send(error);
    });
};

exports.deleteUser =  (req, res) => {
    User.findOneAndDelete({_id: req.params.id})
    .then( data => {
        if(data) {
            res.json(data)
        } else {
            res.status(400).send('Cette identifiant ne correspond à aucun utilisateur')
        }
    }).catch( error => {
        res.send(error);
    });
};