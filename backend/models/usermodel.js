const { Schema, model } = require('../connection');
const mySchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    city:{type:String, default:'Unknown'},
}, { timestamps: true });


module.exports = model('users', mySchema);