
const User = require("../db/model/user.model");
const utilsData = require("../db/utilsData");

exports.getUserById= async(req,res)=>{
    const id = req.params.id;
    let redisCache = null;

    try{
        //ask to redis if this user is already cached
        redisCache = await utilsData.GET_REDIS_ASYNC(id);
        if(redisCache) return res.status(200).json(JSON.parse(redisCache)); //if there is a cache of this request reply with a reponds

        const user = await User.findOne({_id: id}).exec();
        
        if(!user) throw new Error("Not user was found")
        
        await utilsData.SET_REDIS_ASYNC(id, JSON.stringify(user));  //if the request has not been cached yet save it

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

            let redisCache = null;

            //if there is not queries on the request the api get and sends all the users
            if(Object.keys(queryObj).length === 0){

                //verifies on redis before asking mongodb
                redisCache = await utilsData.GET_REDIS_ASYNC("users");
                if(redisCache) return res.status(200).json(JSON.parse(redisCache));
                
                const getAllUsers = await User.find();
                if(!getAllUsers) throw new Error("Not users were found"); //if db is empy throw an error
                await utilsData.SET_REDIS_ASYNC("users", JSON.stringify(getAllUsers));  
                return res.status(200).json(getAllUsers);

            }

            redisCache = await utilsData.GET_REDIS_ASYNC(JSON.stringify(queryObj));
            if(redisCache) return res.status(200).json(JSON.parse(redisCache));

            //if tags are on presented on the query as follows: Tags = value1,value2,value3
            //are converted into an array and the property is modified in order to be able to query using multiple tags
            if(queryObj.hasOwnProperty("tags")){
                queryObj["tags"]= { "$in" :queryObj["tags"].split(",")};
                
            }

        const query = await User.find(queryObj); //accepts multiple filters at once

        await utilsData.SET_REDIS_ASYNC(JSON.stringify(queryObj), JSON.stringify(query));  
        res.status(200).json(query)
    }
    catch(err){
        const message = err.message || err 
        res.status(404).json(message);
    }
}

