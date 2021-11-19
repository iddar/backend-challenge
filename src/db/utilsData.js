const { usersCollection } = require("../fetch");
const User = require("./model/user.model");

 module.exports.loadDataIntoDB = async () => {
  try{
       
    const getAllUsers = await User.find();

    if(getAllUsers.length !==0) throw new Error("Unable to insert data, data already exists")

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
      
      if(deletedUsers.length >0){
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
    


    }
    catch(err){
      console.log(err);
    }
}

const getDeletedUsers = (usersCollection, dbCollection)=>{ //this function helps to get all the users were deleted fron the collection API in order to be able to deleted in our local db
      
  const deletedUsers =  dbCollection.filter(user => {
      return !usersCollection.find(dbUser => {
         return dbUser["_id"] === user["_id"];
      });
   });

   return deletedUsers;
}