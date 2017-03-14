// @flow
import express from 'express'
import passport from 'passport';
import googleOauth from 'passport-google-oauth2'
import users from '../database/users'
import bearer from 'passport-http-bearer'
import request from 'request-promise'

import {User} from "../model";
import {Forbidden} from "../errors";

const GoogleStrategy = googleOauth.Strategy;
const BearerStrategy = bearer.Strategy;

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

passport.use(new BearerStrategy(
    (token, done) => {
        request({
            uri: "https://www.googleapis.com/oauth2/v3/tokeninfo",
            qs: {
                id_token: token
            }
        })
            .then(body => JSON.parse(body))
            .then(user => new User({email: user.email, name: user.name, photo: user.picture}))
            .then(user => users.findOrCreate(user))
            .then(user => done(null, user))
            .catch(err => done(err));
    }
));

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

route.get('/bearer', passport.authenticate('bearer', {}), (req: express.Request, res: express.Response) => {
    res.json(req.user);
});

route.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

route.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
}));

route.get('/user', ensureAuthenticated, (req: express.Request, res: express.Response) => {
    res.json(req.user);
});

route.get('/logout', ensureAuthenticated, (req: express.Request, res: express.Response) => {
    req.logout();
    res.redirect('/');
});

export default route;

export function ensureAuthenticated(req: express.Request, res: express.Response, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return next(new Forbidden("You must be logged in to view this page"));
}