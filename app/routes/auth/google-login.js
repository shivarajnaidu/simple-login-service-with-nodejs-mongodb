'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { TokenServ } = require('../../lib');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const {
    User,
    UserProfiles
} = require('../../models');
const { GoogleProfile } = UserProfiles;
const config = require('config');
const googleConfig = config.get('google');

/**
 * Generate Token 
 **/ 
async function generateToken(user, profile) {
    const tokenData = {
        email: user.email,
        provider: profile.provider,
        userId: profile.userId,
        role: user.role,
        profileId: profile.id
    };

    return TokenServ.generate(tokenData);
}

passport.use(new GoogleStrategy({
    clientID: googleConfig.clientId,
    clientSecret: googleConfig.secret,
    callbackURL: googleConfig.callbackURL
},
    async (accessToken, refreshToken, profile, cb) => {
        const googleId = profile.id;
        const googleName = profile.displayName;
        const emails = profile.emails; // Array Of Objects contains emails..
        const photos = profile.photos; // Array Of Objects contains profile pic urls..
        let email = '';
        let photo;

        if (emails && emails.length > 0) {
            email = profile.emails[0].value;
        }

        if (photos && photos.length > 0) {
            photo = profile.photos[0].value;
        }

        let user = await User.findOne({ email }).exec();
        if (!user) {
            user = new User({ email });
            user = await user.save();
        }

        const userId = user.id;


        let googleProfile = await GoogleProfile.findOne({ googleId }).exec();

        if (googleProfile) {
            // Generate Token
            const token = await generateToken(user, googleProfile)
            cb(null, token);
            return;
        }


        googleProfile = new GoogleProfile({
            userId,
            googleId,
            name: googleName
        });

        googleProfile = await googleProfile.save();
        // Generate Token
        const token = await generateToken(user, googleProfile)
        cb(null, token);
    }
));


router.route('/')


    /**
     * Initaiate Google Login
     * 
     */

    .get(passport.authenticate('google', { session: false, scope: ['email'] }))


router.route('/callback')
    /**
     * Callback URL for Google.. (Need to be whitelisted in google console) 
     */
    .get(async (req, res, next) => {
        passport.authenticate('google', { session: false }, async (error, token, info) => {
            if (error) {
                console.log(error)
                return next(error);
            }



            if (token) {
                const resData = `
                <!DOCTYPE html><html><head></head><body>
                <mark>${token}</mark>
                <script>
                var token = "${token}";
                localStorage.setItem('token', token);
                location.href = 'http://localhost:4200/assets/set-token.html';
                </script>
                </body></html>`;

                res.send(resData)
            } else {
                res.send('Sorry !')
            }

        })(req, res, next);
    })




module.exports = router;