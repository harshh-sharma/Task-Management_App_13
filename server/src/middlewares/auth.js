const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try{
        const token = req?.headers?.authorization?.split(" ")[1];
      
        if(!token){
            return res.status(400).json({
                success: false,
                message:"user is not authenticated",
                data:{}
            })
        }

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);

        req.user = decodedToken;
        next();
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"something went wrong"
        })
    }
}

module.exports = isAuthenticated;