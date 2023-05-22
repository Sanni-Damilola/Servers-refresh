import mongoose from "mongoose";

interface User {
    name: string;
    password: string;
    email: string;
}

interface userData extends User, mongoose.Document{}

const iUser = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        email: {
            type: String,
            required: [true, "password is required"]
        },
    },
    {timestamps: true}
)

const models = mongoose.model<userData>("user", iUser)
export default models