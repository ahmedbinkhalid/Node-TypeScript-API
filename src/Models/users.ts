import { timeStamp } from "console";
import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    name: string;
    username: string;
    password:string;
    email:`${string}@${string}.${string}`;
    createdAt: Date;
}


const UserSchema: Schema = new Schema({
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: {createdAt: true, updatedAt:false}
    }
    
);

export const User = mongoose.model<IUser>('User', UserSchema);


