import { userSIgninService, userSignupService } from "../service/user.service.js";

export const userSignupController = async(req, res) => {
    try {
        const user = await userSignupService(req.body);

        res.status(201).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const userSIgninController = async(req, res) => {
    try {
        const user = await userSIgninService(req.body);

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
};