
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

exports.filterUsersHandler = async(req, res)=>{
    try{
            const queryObj = {...req.query} //get all the queries and get a copy as an object

            //if there is not queries on the request the api get and sends all the users
            if(Object.keys(queryObj).length === 0){
                const getAllUsers = await User.find();
                if(!getAllUsers) throw new Error("Not users were found"); //if db is empy throw an error
                
                return res.status(200).json(getAllUsers);

            }

            //if tags are on presented on the query as follows: Tags = value1,value2,value3
            //are converted into an array and the property is modified in order to be able to query using multiple tags
            if(queryObj.hasOwnProperty("tags")){
                queryObj["tags"]= { "$in" :queryObj["tags"].split(",")};
                
            }

        const query = await User.find(queryObj); //accepts multiple filters at once

        
        res.status(200).json(query)
    }
    catch(err){
        const message = err.message || err 
        res.status(404).json(message);
    }
}

