const express = require('express');
const router = express.Router();
const controller = require('../controllers/failures');
const passportService =require('../services/passport');
const passport =require('passport');

const auth=passport.authenticate('jwt',{session:false});
//@route    GET /
//@desc     GET All Failures
//@access   Private
router.get('/',  controller.getFailures);

//@route    GET /:id
//@desc     GET Failure By Id
//@access   Private
router.get('/:id',  controller.getFailure);

//@route    POST /
//@desc     Add Failure to Database
//@access   Private
router.post('/',  controller.addFailure);

//@route    PUT /:id
//@desc     Update Failure
//@access   Private
router.put('/:id',  controller.updateFailure);

//@route    DELETE /Equipement/:id
//@desc     Delete Failure
//@access   Private
router.delete('/:id',  controller.deleteFailure);

module.exports = router