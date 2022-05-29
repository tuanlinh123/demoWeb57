const mongoose = require('mongoose'),
    // Chema = mongoose.Schema,
    UserSchema = new mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            fullname: {
                type: String,
            },
        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model('User', UserSchema)
