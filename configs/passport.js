const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

//serialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('token');
opts.secretOrKey = process.env.JWT;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log('payload is ',jwt_payload);
    User.findOne({_id: jwt_payload.userId}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));