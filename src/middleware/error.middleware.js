export const errorHandler = async(err, req, res, next) => {
    console.error(err);

    res.status(400).json({ success: false, message: err.message || "Something went wrong"})
};