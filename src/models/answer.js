const mongoose = require('mongoose'),
    // Chema = mongoose.Schema,
    answer = new mongoose.Schema(
        {
            description: {
                type: String, 
            },
            questionId:{
                type:String,
            },
            userId:{
                type:String,
            }
        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model('answer', answer)
