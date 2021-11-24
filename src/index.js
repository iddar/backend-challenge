const express = require('express')
const { usersCollection } = require('./fetch')
const { Sequelize } = require('sequelize');
//const sequelize = require('/com.docker.devenvironments.code/src/db/db.js');
//console.log('hola soy sequilize',sequelize)
const Users =require('./db/models/Users')
require('dotenv').config();
const app = express()
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000

app.get('/', async (req, res) => {
   const user = await usersCollection()
   res.json(user)
   user.data.forEach(async(user)=>{
     try{
       await Challenge.findorCreate({
         where:{
          id:user.id,
        index:user.index ? user.index:'index not found',
        guid:user.guid ? user.guid : 'guid not found',
        isActive: user.isActive,
        balance: user.balance ? user.balance : 'balance not found',
        picture: user.picture ? user.picture : 'picture not found ',
        age: user.age ? user.age : 'age not found',
        eyeColor: user.eyeColor ? user.eyeColor : 'eyeColor not found',
        name:user.name ? user.name : 'name not found',
        company: user.company ? user.company : 'company not found',
        email: user.email ? user.email : 'email not found',
        phone: user.phone ? user.phone :  'phone not found ',
        address: user.address ? user.address :'addres not found ',
        about: user.about ? user.about : 'about not found ',
        registered: user.registered ? user.registered : 'registered not found',
        latitude: user.latitude ? user.latitude : 'latitud not found',
        longitude: user.longitude ? user.longitude : 'longitude not found',
        tags: user.tags ? user.tags : ' tags not found',
        range: user.range ? user.range : ' range not found',
        friends: user.friends ? user.friends : 'friends not found',
        greeting: user.greeting ? user.greeting : 'greeting not found',
        favoriteFruit: user.favoriteFruit ? user.favoriteFruit : 'favorite fruit not found ',

         }
       })
     } catch (error){
       console.log(error.message)
     }
   })
   let tagss = require.query
   if(tagss){
     try{
    let tag = await Users.findAll({
      where:{
        ta:tags 
      }
   })
   res.json(tag)
   }catch(error){
     console.log('not found')
   }
  }
   else {
     return 'no tag provided'
   }
   tag = tag.map(t => t.)
});
//Parseamos el objeto recibido de findAll porque es una referencia circular (?)
videogamesDb = JSON.stringify(videogamesDb);
videogamesDb = JSON.parse(videogamesDb);
//Aca dejamos el arreglo de generos plano con solo los nombres de cada genero
videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
    ...el,
    genres: el.genres.map(g => g.name)
}), [])
   let {eyeColor} =req.query
   if (eyeColor){
     const users =await Users.findAll({
       where:{
         name:{
           [Sequilize.op.iLike]: '%${eyeColor}%',
         },
       },
     })
     return res.status(200).send(users)
   }else if(!eyeColor){
     const usersdb =await Users.findAll({})
     return res.json(usersdb)
   }
})



app.get('/users/:id', async (req, res) => {
 const{id} = req.params;
 const detail = id.toUpperCase()
 const user =await Users.findByPk(detail)
 user ? res.json(user) : res.sendStatus(404)
})


app.listen(port, () => {
  console.log(` connection  at http://localhost:${port}`)
})
const { DB_USER,
        DB_PASSWORD,
        DB_HOST,
        
 } = process.env;
 const {Challange } = sequelize.models;
 
   const  database={
        username: `${DB_USER}`,
        password: `${DB_PASSWORD}`,
        database: 'challenge', 
        host: `${DB_HOST}`
    }

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: 'postgres',
        logging: false
    })



  sequelize.sync( {force: false}).then(() => {
      console.log('Conection to the DB Success');
  }).catch(error => {
      console.log('An error has been found: ',error)
  })


module.exports = app
