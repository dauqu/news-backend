
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UsersSchema = require("./../models/users_schema");

async function CheckLogin(req, res) {

    //CHeck auth 
    const token = req.headers["x-auth-token"];

    if (token === undefined || token === null || token === "") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UsersSchema.findOne({ _id: decoded.id });
        // Convert the Mongoose document object to a plain JavaScript object
        const userObject = user.toObject();
        // Remove the password field from the user object
        delete userObject.password;
        return res.status(200).json(userObject);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = CheckLogin;