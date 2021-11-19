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
      

      for (const user of users) {
        const updatedUser = await User.findOneAndReplace({"_id":user["_id"]}, user, {new: true});
        console.log(updatedUser)
        if(!updatedUser){
            const newUser = await User.insertOne(user);
          
        }
      }
    


    }
    catch(err){
      console.log(err);
    }
}