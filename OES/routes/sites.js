const express = require('express');
const router = express.Router();
const controller = require('../controllers/sites');
const passportService =require('../services/passport');
const passport =require('passport');

const auth=passport.authenticate('jwt',{session:false});

//@route    GET /
//@desc     GET All Sites
//@access   Private
router.get('/', controller.getSites);

//@route    GET /:id
//@desc     GET Site By Id
//@access   Private
router.get('/:id', controller.getSite);

//@route    POST /
//@desc     Add Site to Database
//@access   Private
router.post('/', controller.addSite);

//@route    PUT /:id
//@desc     Update Site
//@access   Private
router.put('/:id', controller.updateSite);

//@route    DELETE /Equipement/:id
//@desc     Delete Site
//@access   Private
router.delete('/:id',controller.deleteSite);
  
module.exports = router