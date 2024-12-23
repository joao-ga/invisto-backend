import mongoose from "../database/connDB";

const {Schema} = mongoose

// model do usuário, define os campos do documento
const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            require: true
        }, 
        email: {
            type: String,
            require: true
        }, 
        password: {
            type: String,
            require: true
        },
        confirmedPassword: {
            type: String,
            require: true
        },
        cpf: {
            type: String,
            require: true
        },
        birth: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        },
        coins: {
            type: Number,
            require: true
        },
        uid:{
            type: String
        },
        ranking_id:{
            type: String
        },
        stocks:{
            type: Array
        }
    },
    {timestamps: true}
    )
)

export default User