const bcrypt = require('bcrypt');
const validator = require('validator');
const passwordValidator = require('password-validator');
const rateLimit = require('express-rate-limit');


const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8) // Minimum length of 8 characters
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(1) // Must have at least 1 digit
    .has().not().spaces(); // Should not contain spaces

const userUtils = {
    hashPassword: async (password) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    },

    comparePassword: async (password, hashedPassword) => {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
    },

    validateEmail: (email) => {
        return validator.isEmail(email);
    },

    validatePassword: (password) => {
        // Add your password validation logic here
        // For example, check for minimum length or specific requirements
        return passwordSchema.validate(password);
    },

    limiter: rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5, // Limit each IP to 5 requests per windowMs
        message: 'Too many requests from this IP, please try again later',
    })
};

module.exports = userUtils;

