const {getAllUser,getUserById, getUserAlbumsById, getUserAlbumsAndImagesByUserId} = require("../service/userService");

exports.getAllUser =  (req, res) => {
    return getAllUser(req,res);
}

exports.getUserById =  (req, res) => {
    console.log("In method getUserById .UserId :: "+req.params.id)
    return getUserById(req.params.id ,res);
}

exports.getUserAlbumsById =  (req, res) => {
    console.log("In method getUserAlbumsById .UserId :: "+req.params.id)
    return getUserAlbumsById(req.params.id,res);
}

exports.getUserAlbumsAndImagesByUserId =  (req, res) => {
    console.log("In method getUserAlbumsAndImagesByUserId .UserId :: "+req.params.id)
    return getUserAlbumsAndImagesByUserId(req.params.id,req,res);
}
