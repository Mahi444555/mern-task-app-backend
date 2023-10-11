const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
  phone: { type: Number, required: true }, 
  gender: { type: String, required: true, enum: ["male", "female", "other"] }, 
  city: { type: String, required: true, enum: ["Mumbai", "Pune", "Ahmedabad"] }, 
  options: { type: String, required: true, enum: ["linkedin", "friends", "portal", "other"] }, 
  state: { type: String, required: true, enum: ["Gujarat", "Maharashtra", "Karnataka"] }, 


});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
    phone: Joi.number().required().label("phone"),
    gender: Joi.string().valid("male", "female", "other").required().label("Gender"), // Added gender validation
    city: Joi.string().valid("Mumbai", "Pune", "Ahmedabad").required().label("City"), // Added city validation
    options: Joi.string().valid("linkedin", "friends", "portal", "other").required().label("How did you hear about this"), // Added options validation
    state: Joi.string().valid("Gujarat", "Maharashtra", "Karnataka").required().label("State"), // Added state validation

	});
	return schema.validate(data);
};

module.exports = { User, validate };
