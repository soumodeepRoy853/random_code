import jwt, { decode } from "jsonwebtoken";
import User from "../model/user.model.js";

export const authMiddleware = async(req, res, next) => {
    try {
        let token;

        //Extract token from Authorization header
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1];
        };

        if(!token){
            return res.status(401).json({ success: false, message: "Missing Token"})
        };

        //Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Fetch user from DB
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({ success: false, message: "User not found"})
        };

        //Attach user to req
        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid Token"})
    }
}