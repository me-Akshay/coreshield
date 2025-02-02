const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters"],
        },
        lastname: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "Password must be at least 5 characters"],
        select: false
    },
    roles: {
        type: [String],
        enum: ['admin', 'editor', 'viewer'],
        default: ['viewer']
    },
 
})

// Add roles to JWT payload
userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    )
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10)
}

module.exports = mongoose.model("user", userSchema)