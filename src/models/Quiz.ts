import mongoose from "../database/connDB";

const {Schema} = mongoose

const Quiz = mongoose.model(
    'Quiz',
    new Schema({
        question: {
            type: String,
            required: true
        },
        answers: {
            type: Array,
            required: true
        },
        addCoins: {
            type: Number,
            required: true
        },
        subject: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
    )
)

export default Quiz;