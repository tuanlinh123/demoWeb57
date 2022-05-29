const mongoose = require('mongoose'),
    // Schema = mongoose.Schema,
    QuestionSchema = new mongoose.Schema(
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            tags: {
                type: Array,
            },
            vote: {
                type: Number,
                enum: [1, 2, 3, 4, 5],
                default: 5,
            },
            answerCount: {
                type: Number,
            },
            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                // required: true,
            },
        },
        {
            timestamps: true,
        }
    )
module.exports = mongoose.model('Question', QuestionSchema)
