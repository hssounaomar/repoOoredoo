const express = require('express');
const router = express.Router();
const controller = require('../controllers/equipements');
const passportService =require('../services/passport');
const passport =require('passport');

const requireAuth=passport.authenticate('jwt',{session:false});

//@route    GET /
//@desc     GET All Equipements
//@access   Private
router.get('/',controller.getEquipements);

//@route    GET /:id
//@desc     GET Equipement By Id
//@access   Private
router.get('/:id',  controller.getEquipement);

//@route    POST /
//@desc     Add Equipement to Database
//@access   Private
router.post('/',  controller.addEquipement);

//@route    PUT /:id
//@desc     Update Equipement
//@access   Private
router.put('/:id',  controller.updateEquipement);

//@route    DELETE /Equipement/:id
//@desc     Delete Equipement
//@access   Private
router.delete('/:id',  controller.deleteEquipement);
  
module.exports = router