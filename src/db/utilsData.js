const { usersCollection } = require("../fetch");
const User = require("./model/user.model");
const {promisify} = require('util');
const redis = require('redis');

const redisClient = redis.createClient({
  host: "redis",
  port: 6379
})

module.exports.GET_REDIS_ASYNC = promisify(redisClient.get).bind(redisClient);
module.exports.SET_REDIS_ASYNC = promisify(redisClient.set).bind(redisClient);
const FLUSH_REDIS_ASYNC = promisify(redisClient.flushdb).bind(redisClient);


 module.exports.loadDataIntoDB = async () => {
  try{
       
    const getAllUsers = await User.find();

    if(getAllUsers.length !==0){
      console.log("........Unable to insert data, data already exist........");
      return this.updateData(); //if db already has data the data is updated. if not the data is inserted
    }

    const users = await usersCollection();

    const setUsers = await User.insertMany(users);
      

    console.log("data inserted")

  
 
  }

  
  catch(err){
    const message = err.message || err
    console.log(message)
  }  
 
};

module.exports.updateData = async()=> {
    try{
      const users = await usersCollection();
      const allDBUsers= await User.find();
      const deletedUsers = getDeletedUsers(users, allDBUsers);
     
      console.log("........Updating DB........");
      if(deletedUsers.length >0){  //if some prev users were deleted from the API we need to remove them from our local db
          for(const deletedUser of deletedUsers){
             const removeUser = await User.findOneAndDelete({"_id": deletedUser["_id"]});
             
          }
      }

      for (const user of users) {
        const updatedUser = await User.findOneAndReplace({"_id":user["_id"]}, user, {new: true});
        
        if(!updatedUser){
            const newUser = await User.create(user); //if some new user has been added to the collection but the datadb we need to added to mongodb
          
        }
      }
    
    console.log("........Flushing redis cache........");
    const flushResponse = await FLUSH_REDIS_ASYNC();
    console.log("........Flush completed........");
    console.log("........DB has been updated........");
    }
    catch(err){
      console.log(err);
    }
}

const getDeletedUsers = (usersCollection, dbCollection)=>{ //this function helps to get all the users were deleted from the collection API in order to be able to deleted in our local db
      
  const deletedUsers =  dbCollection.filter(user => {
      return !usersCollection.find(dbUser => {
         return dbUser["_id"] === user["_id"];
      });
   });

   return deletedUsers;
}