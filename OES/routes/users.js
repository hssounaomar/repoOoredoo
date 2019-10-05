const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const passportService =require('../services/passport');
const passport =require('passport');
const authenticate=require('../controllers/auth');
const auth=passport.authenticate('jwt',{session:false});

//@route    GET /roles/:role
//@desc     Get Users By Role
//@access   Private
router.get('/roles/:role', controller.getUsersByRole);

//@route    PATCH /:id
//@desc     Set user profile picture
//@access   Private
router.patch('/:id', controller.setProfilePicture);

//@route    GET /
//@desc     GET All Users
//@access   Private
router.get('/', controller.getUsers);

//@route    POST /
//@desc     Register User
//@access   Private
router.post('/register', controller.registerUser);

//@route    PUT /:id
//@desc     Update User
//@access   Private
router.put('/:id', controller.updateUser);

//@route    DELETE /:id
//@desc     Remove User From Database
//@access   Private
router.delete('/:id', controller.deleteUser);

//@route    GET /users/user
//@desc     GET User By Token
//@access   Private
router.get('/user', controller.getUserByToken);

//@route    POST /users/invite/send
//@desc     Invite user to Register
//@access   Private
router.post('/invite/send', controller.invite)
router.post('/',authenticate.signup)
//@route    GET /users/invite/check
//@desc     Check invitation's token validity
//@access   Private
router.get('/invite/check', controller.verifyToken)
  
module.exports = router