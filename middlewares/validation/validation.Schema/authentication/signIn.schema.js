const joi = require("joi");

const studentSignInSchema = joi.object().keys({
    email : joi.string().email().required().label("Student email"),
    password : joi.string().required().label("Student password"),
});

module.exports = {
    studentSignInSchema
}