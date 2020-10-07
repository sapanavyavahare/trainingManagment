const mysql = require('mysql');
const dotenv = require('dotenv').config({path:'C:/Users/Sapana.vyavahare/OneDrive - Happiest Minds Technologies Pvt Ltd/Documents/node_Learnings/TrainingManagment/.env'})
const  connection = mysql.createConnection({
    host:process.env.DB_HOSTNAME,
    user:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DEL_DB_NAME,
    port:3306
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
 
  console.log('Connected to the MySQL server.');
});

module.exports=connection;