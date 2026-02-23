import User from "../model/user.model.js";
import generateToken from "../utils/generateToken.js";

export const userSignupService = async(userData) => {
    try {
        if(!userData || typeof userData != "object"){
            throw new Error("Please enter user details");
        };

        const { userName, email, password } = userData;

        if(!userName){
            throw new Error("Please enter username");
        };

        if(!email){
            throw new Error("Please enter your email")
        };

        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw new Error("Email already registered, please login");
        };

        if(!password){
            throw new Error("Password is required")
        };

        const user = await User.create({ userName, email, password });

        return{
            id: user._id,
            userName: user.userName,
            email: user.email
        }
    } catch (err) {
        throw err;
    }
};

export const userSIgninService = async(userData) => {
    try {
       const { email, password } = userData;

       if(!email){
        throw new Error("Please enter ypur registered email")
       };

       const user = await User.findOne({ email });
       if(!user){
        throw new Error("Email is not registred, please Signup first")
       };

       if(!password){
        throw new Error("Please enter your password")
       };

       const isMatch = await user.comparePassword(password);
       if(!isMatch){
        throw new Error("Invalid password")
       };

    const token = generateToken(user._id);

       return {
        user,
        token
       }

    } catch (err) {
        throw err;
    }
}