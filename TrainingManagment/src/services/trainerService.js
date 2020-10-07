const connection = require('../models/sql/dbconn');
const db = require('../models');
const Trainer = db.tbl_trainers;
 async function getTrainer()
{
   return new Promise((res,rej)=>{
     Trainer.findAll().then((trainers)=>{
      console.log("users in service ",trainers);
      res(trainers);
      }).catch((err)=>{
        console.log("error ",err);
        rej(err);
      });
  });
}
//getTrainer();




//get trainer by id
async function getTrainerById (id) 
 {
    return new Promise((res,rej)=>{
       Trainer.findByPk(id).then((trainer)=>{
         console.log("trainer in service ",trainer);
         res(trainer);
       }).catch((err)=>{
         console.log("err in service",err);
         rej(err);
       })
    })   
}

//create trainer
createTrainer = (req,url)=>{
  return new Promise(async(res,rej)=>{
   // console.log("req body in service ",req);
    await Trainer.create({
      trainer_name : req.trainer_name,
      trainer_email:req.trainer_email,
      trainer_phone:req.trainer_phone,
      trainer_address:req.trainer_address,
      trainer_photo_url:url,
      is_active:req.is_active,
      createdAt:new Date(),
      updatedAt:new Date()
    }).then((trainer)=>{
      console.log("trainer",trainer);
      res(trainer);
    }).catch((err)=>{
      console.log("err",err);
      rej(err);
    })
  })
}

 //update trainer
 updateTrainer =( req)=>{
   const emp_id = req.params.id;
   return new Promise(async(res,rej)=>{
     await Trainer.update({"trainer_email":req.body.trainer_email},{
       where:{
         id:req.params.id
       }
     }).then((trainer)=>{
       console.log("trainer",trainer);
       res(trainer);
     }).catch((err)=>{
       console.log(err);
       rej(err);
     })
   })
    }

 //deleting trainer by id
 deleteTrainer=(id)=>
{
  return new Promise(async (res,rej)=>{
    await Trainer.destroy({
      where:{
        id:id
      }
    }).then((trainer)=>{
      console.log("trainer",trainer);
      res(trainer);
    }).catch((err)=>{
      console.log("err",err);
      rej(err);
    })
  })
    
}
//deleteTrainer(2);
module.exports = { getTrainer , getTrainerById,createTrainer , deleteTrainer, updateTrainer}