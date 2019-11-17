const express = require('express');
const router = express.Router();
const { Authentication , Signup , Confirmation} = require('../controllers/AuthController');


router.post('/login',Authentication);
router.post('/signup',Signup);
router.post('/confirm/:token',Confirmation);

module.exports = router ;


