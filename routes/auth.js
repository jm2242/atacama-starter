// @flow
import express from 'express'
import passport from 'passport';
import googleOauth from 'passport-google-oauth2'
import users from '../database/users'

import {User} from "../model";
import {Forbidden} from "../errors";

const GoogleStrategy = googleOauth.Strategy;

let callback = "http://localhost:3000/auth/google/callback";

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    callback = "http://atacama.lloydramey.com/auth/google/callback";
}


function getImageUrlFromProfile(profile) {
    if (!profile.photos) {
        return null;
    }

    return profile.photos[0].value;
}

passport.use(new GoogleStrategy({
    clientID: process.env.ATACAMA_OAUTH_ID,
    clientSecret: process.env.ATACAMA_OAUTH_SECRET,
    callbackURL: callback,
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    const email = profile.email;
    const photo = getImageUrlFromProfile(profile);
    const name = profile.displayName;

    return users.findOrCreate(new User({email, name, photo}))
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    users.findOne(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});

const route = express.Router();

route.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

route.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/user',
    failureRedirect: '/',
}));

route.get('/user', ensureAuthenticated, function(req: express.Request, res: express.Response) {
    res.json(req.user);
});

export default route;

export function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    }

    next(new Forbidden("You must be logged in to view this page"));
}