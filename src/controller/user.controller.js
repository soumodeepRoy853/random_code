import { userSigninService, userSignupService, getAllUsersService } from "../service/user.service.js";

export const userSignupController = async(req, res) => {
    try {
        const user = await userSignupService(req.body);

        res.status(201).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const userSigninController = async(req, res) => {
    try {
        const user = await userSigninService(req.body);

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
};

export const getAllUsersController = async(req, res) => {
    try {
        const users = await getAllUsersService();

        res.status(200).json({ success: true, data: users });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}