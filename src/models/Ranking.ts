import mongoose from "../database/connDB";

const {Schema} = mongoose;

const Ranking = mongoose.model(
    'Ranking',
    new Schema({
        id: {
            type: String,
            require: true
        },
        participants: {
            type: Array,
            require: true
        }
    },
    {timestamps: true}
    )
)

export default Ranking;