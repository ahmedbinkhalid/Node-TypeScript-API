import {User, IUser} from '../../Models/users';
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';

import dotenv from "dotenv";
dotenv.config();


const secret = process.env.SECRET;
export const registerUser = async (
    name: string,
    username: string,
    email: string,
    password: string,
    
): Promise<IUser> => {
    // check if user already exist or not 
    try{
        const existingUser = await User.findOne({$or:[{email}, {username}]});
        if(existingUser){
            throw Error("User already exits with either mail or username");
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });

        return await newUser.save();
    } catch(error){
        console.error("User not registered", error);
        throw Error;
    }
}


export const LoginUser = async(
    email: string,
    password:string
): Promise<{token: string}>=>{

    const user = await User.findOne({email});

    if(!user){
        throw new Error("No user exist with this email");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Password is incorrect")
    }

    // Generate Token 

    const token = JWT.sign(
        {userid: user._id},
        secret!, {
            expiresIn: '1h'
        }
    )
    return {token, userid};
}