const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
	  email : { type: String, required: true },
    phone : { type: Number, required: true }
});

const users1 = new mongoose.model("users1", userSchema);  //here we creating "users1" as new collection 

module.exports = users1;
