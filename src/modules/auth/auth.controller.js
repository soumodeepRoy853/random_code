import { userSigninService, userSignupService } from "../auth/auth.service.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

export const userSignupController = async(req, res) => {
    try {
        const validateData = registerSchema.parse(req.body);

        const user = await userSignupService(validateData);

        res.status(201).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const userSigninController = async(req, res) => {
    try {
        const validateData = loginSchema.parse(req.body);

        const user = await userSigninService(validateData);

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
};