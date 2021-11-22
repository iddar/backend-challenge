
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

            redisCache = await utilsData.GET_REDIS_ASYNC(JSON.stringify(queryObj));
            if(redisCache) return res.status(200).json(JSON.parse(redisCache));

            //if tags are on presented on the query as follows: Tags = value1,value2,value3
            //are converted into an array and the property is modified in order to be able to query using multiple tags
            if(queryObj.hasOwnProperty("tags")){
                queryObj["tags"]= { "$in" :queryObj["tags"].split(",")};
                
            }
          
            let queryStr = JSON.stringify(queryObj); //query object was parse into string to be able to add $ operator for advance filtering
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
            
         
         
            let query =User.find(JSON.parse(queryStr)); //accepts multiple filters at once
           
            
            if(queryObj.sort){ // if sort is presented on query, results can be sort by registered day in asc or desc order
               query = query.sort({ registered: queryObj.sort});
            }else{ // by default results are sort in asc order
                query = query.sort({ registered: 'asc'})
            }

              

            const results = await query; //query is executed
            if(results.length === 0) {
                await utilsData.SET_REDIS_ASYNC(JSON.stringify(queryObj), "not results were found");  
                return res.status(404).send("not results were found");
            } 

            await utilsData.SET_REDIS_ASYNC(JSON.stringify(queryObj), JSON.stringify(results));  
            res.status(200).json(results)
    }
    catch(err){
        const message = err.message || err 
        res.status(404).json(message);
    }
}

