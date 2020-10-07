const express = require('express');
const dotenv = require('dotenv').config({path:'C:/Users/Sapana.vyavahare/OneDrive - Happiest Minds Technologies Pvt Ltd/Documents/node_Learnings/TrainingManagment/.env'})
const app = express();
const trainer = require('./routes/trainer-routes');
const port = process.env.port;
const bodyParser= require('body-parser');
const models = require('./models');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(trainer);
app.listen(port,function(){
    models.sequelize.sync();
});
console.log(`server listening on port  ${port}`);