const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories');
const passportService =require('../services/passport');
const passport =require('passport');

const requireAuth=passport.authenticate('jwt',{session:false});

//@route    GET /
//@desc     GET Categories
//@access   Private
router.get('/', controller.getCategories);

//@route    GET /:id
//@desc     GET Category
//@access   Private
router.get('/:id',  controller.getCategory);

//@route    POST /
//@desc     Add Category to Database
//@access   Private
router.post('/',  controller.addCategory);

//@route    PUT /:id
//@desc     Update Category
//@access   Private
router.put('/:id',  controller.updateCategory);

//@route    DELETE /category/:id
//@desc     Delete Category
//@access   Private
router.delete('/:id',  controller.deleteCategory);
  
module.exports = router