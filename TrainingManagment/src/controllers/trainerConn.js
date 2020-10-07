const { getTrainer , getTrainerById , createTrainer , deleteTrainer ,updateTrainer } = require('../services/trainerService');
const {uploadFile , readFile , getS3URL , readField } = require('../middlewares/trainerImage');
const multer = require('multer');
const upload = multer({
    dest:'images'
})
const formidable = require('formidable');
//getTrainer
  function getTrainers(req,res)
{
    try{
        console.log("in conn");

         getTrainer().then((result)=>{
             console.log("result in controller ",result);
            res.status(200).send({"success":true,"Users":result});
         }).catch((err)=>{
            res.status(404).send(err)
         });
       } catch(err){
        res.status(500).send(err.stack);
    }

}
  
//get trainer by id 

function getTrainersById(req,res)
{
    try{
        console.log("id in conn ", req.params.id);
         getTrainerById(req.params.id).then((result)=>{
             console.log("result in controller ",result);
            res.status(200).send({"success":true,"Users":result});
         }).catch((err)=>{
            res.status(404).send(err)
         });
       } catch(err){
        res.status(500).send(err.stack);
    }

}

async function signUp(req,res)
{
    try{
        //console.log('fields in conn',req.body);
        //console.log("file2",req.file);
        const fileName = (req.file.originalname).toString();
        const filePath = (req.file.path).toString();
        const ans = await uploadFile(filePath,fileName);
        console.log("ans ",ans);
        const URL = await getS3URL(fileName);
       // console.log("ans2",URL);
        var newUrl = URL.toString().split('?');
        createTrainer(req.body,newUrl[0]).then((result)=>{
             console.log("result in controller ",result);
            res.status(200).send({"success":true,"Users":result});
         }).catch((err)=>{
            res.status(404).send(err)
         });
       } catch(err){
        res.status(500).send(err.stack);
    }

}
function trainerDelete(req,res)
{
    try{
        console.log("id in conn ", req.params.id);
         deleteTrainer(req.params.id).then((result)=>{
             console.log("result in controller ",result);
            res.status(200).send({"success":true,"Users":result});
         }).catch((err)=>{
            res.status(404).send(err)
         });
       } catch(err){
        res.status(500).send(err.stack);
    }

}

//updatetrainer
function trainerUpdate(req,res)
{
    try{
        console.log("id in conn ", req.params.id);
         updateTrainer(req).then((result)=>{
             console.log("result in controller ",result);
            res.status(200).send({"success":true,"Users":result});
         }).catch((err)=>{
            res.status(404).send(err)
         });
       } catch(err){
        res.status(500).send(err.stack);
    }

}
 

function dummy(req,res){
    console.log("file",req.body);
    console.log("file2",req.file);
}
 

module.exports = { getTrainers , getTrainersById , signUp , trainerDelete , trainerUpdate, dummy}