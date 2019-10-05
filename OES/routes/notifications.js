const express = require('express');
const router = express.Router();
const controller = require('../controllers/notifications');
const passportService =require('../services/passport');
const passport =require('passport');

const auth=passport.authenticate('jwt',{session:false});

//@route    GET /
//@desc     GET All Notifications
//@access   Public
router.get('/',auth, controller.getNotifications);

//@route    GET /:id
//@desc     GET Notification By Id
//@access   Public
router.get('/:id',auth, controller.getNotification);

//@route    POST /
//@desc     Add Notification to Database
//@access   Public
router.post('/',auth, controller.addNotification);

//@route    PUT /:id
//@desc     Update Notification
//@access   Public
router.put('/:id',auth, controller.updateNotification);

//@route    DELETE /Equipement/:id
//@desc     Delete Notification
//@access   Public
router.delete('/:id',auth, controller.deleteNotification);

module.exports = router