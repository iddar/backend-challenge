require('dotenv').config();

const { DB_USER,
        DB_PASSWORD,
        DB_HOST,
        DB_NAME
 } = process.env;

module.exports = {
    database:{
        username: `${DB_USER}`,
        password: `${DB_PASSWORD}`,
        database: 'challenge', //`${DB_NAME}`, nombre de la base de datos
        host: `${DB_HOST}`
    }
} 