
module.exports.checkSession = function (req, res, next) {
    const headers = req.headers("Authorization");
    const token = headers.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.userID = decoded.userID;
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'No token provided.'
        });
    }
}