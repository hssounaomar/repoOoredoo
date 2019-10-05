const express = require('express');
const router = express.Router();
const controller = require('../controllers/equipementTypes');
const passportService =require('../services/passport');
const passport =require('passport');

const requireAuth=passport.authenticate('jwt',{session:false});
//@route    GET /
//@desc     GET All EquipementTypes
//@access   Private
router.get('/', requireAuth, controller.getEquipementTypes);

//@route    GET /:id
//@desc     GET EquipementType By Id
//@access   Private
router.get('/:id', requireAuth, controller.getEquipementType);

//@route    POST /
//@desc     Add EquipementType to Database
//@access   Private
router.post('/', requireAuth, controller.addEquipementType);

//@route    PUT /:id
//@desc     Update EquipementType
//@access   Private
router.put('/:id', requireAuth, controller.updateEquipementType);

//@route    DELETE /Equipement/:id
//@desc     Delete EquipementType
//@access   Private
router.delete('/:id', requireAuth, controller.deleteEquipementType);

module.exports = router