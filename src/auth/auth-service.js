const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
    getUserWithUserName(db, user_name) {
        return db('rehearsalspace_users')
            .where({ user_name })
            .first()
    },
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            expiresIn: 20,
            algorithm: 'HS256',
        })
    },
    parseBasicToken(basicAuth) {
        return Buffer.from(basicAuth, "base64")
            .toString()
            .split(":");
    },
    getUserwithUserName(db, user_name) {
        return db("rehearsalspace_users")
            .where({ user_name })
            .first();
    },
    verifyJwt(token) {
        return jwt.verify(token, config.JWT_SECRET);
    }
};

module.exports = AuthService;