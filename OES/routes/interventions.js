const express = require('express');
const router = express.Router();
const controller = require('../controllers/interventions');
const passportService =require('../services/passport');
const passport =require('passport');

const auth=passport.authenticate('jwt',{session:false});

//@route    GET /
//@desc     GET All Interventions
//@access   Private
router.get('/',controller.getInterventions);

//@route    GET /:id
//@desc     GET Intervention By Id
//@access   Private
router.get('/:id', controller.getIntervention);

//@route    POST /
//@desc     Add Intervention to Database
//@access   Private
router.post('/', controller.addIntervention);

//@route    PUT /:id
//@desc     Update Intervention
//@access   Private
router.put('/:id', controller.updateIntervention);

//@route    DELETE /Equipement/:id
//@desc     Delete Intervention
//@access   Private
router.delete('/:id', controller.deleteIntervention);
router.put('/changeState/:id', controller.updateStateOfIntervention);
router.put('/completeIntervention/:id',controller.completeIntervention);
module.exports = router