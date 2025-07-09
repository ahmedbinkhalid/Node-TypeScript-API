import {User, IUser} from '../../Models/users';
import bcrypt from "bcrypt";

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