
const User = require("../db/model/user.model");

exports.getUserById= async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await User.findOne({_id: id}).exec();
        
        if(!user) throw new Error("Not user was found")
            
        res.status(200).json(user)
    }
    catch(err){
        const message = err.message || err;
        res.status(404).json(message)
    }
}