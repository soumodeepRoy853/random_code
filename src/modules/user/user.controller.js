import { getMyProfileService } from "./user.service.js";

export const getMyProfileController = async(req, res, next) => {
    try {
        const { user } = req.user;
       const profile = await getMyProfileService(req.user._id);
       
       res.status(200).json({ success: true, data: profile })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message});
    }
}