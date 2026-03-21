import { createPracticeService, getAllPracticeService, getMyPracticeByIdService } from "./practice.service.js";

export const createPracticeController = async(req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        const practice = await createPracticeService(userId, req.body);

        res.status(200).json({ success: true, data: practice })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getAllPracticeController = async(req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        const practices = await getAllPracticeService(userId, req.query);

        res.status(200).json({ success: 200, data: practices });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message})
    }
};

export const getMyPracticeByIdController = async(req, res) =>{
    try {
        const userId = req.user?._id || req.user?.id;
        const { practiceId } = req.params;

        const practice = await getMyPracticeByIdService(userId, practiceId);
        
        return res.status(200).json({ success: true, data: practice });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message})
    }
}