import mongoose from "../database/connDB";

const {Schema} = mongoose

const Stock = mongoose.model(
    'Stock',
    new Schema({
        code: {
            type: String,
            require: true
        },
        lastPrice: {
            type: Number,
            require: true
        },
        variation: {
            type: Number,
            require: true
        }
    },
    {timestamps: true}
    )
)

export default Stock