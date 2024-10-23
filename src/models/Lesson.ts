import mongoose from "../database/connDB";

const {Schema} = mongoose

const Lesson = mongoose.model(
    'Lesson',
    new Schema({
        title: {
            type: String,
            require: true
        },
        introduction: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        subject: {
            type: String,
            require: true
        }
    },
    {timestamps: true}
    )
)

export default Lesson;