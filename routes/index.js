var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportConf = require('../configs/passport');
/* GET home page. */
router.get('/',passport.authenticate('jwt',{session: false}), function(req, res, next) {
  res.send('index');
});

module.exports = router;
