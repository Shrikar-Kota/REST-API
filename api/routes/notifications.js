const express = require('express');

const router=express.Router();

 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/api-db";

   
router.get('/:PersonId',(req,res,next)=>{
    var BodyofPage={notifications:[]};
    MongoClient.connect(url, function(err, db) {
        if (err) {//pass
        };
       var dbo = db.db("api-db");
       var condition={_id : parseInt(req.params.PersonId)}; 
    dbo.collection('Registration').findOne(condition,(err,result)=>{
            if (err) {//pass
            }
            BodyofPage.notifications=result.notifications;
            res.status(200).json(BodyofPage.notifications);
            for(var x in BodyofPage.notifications){
                BodyofPage.notifications[x].seen="1";
            };
            var newvalues = { $set: {notifications: BodyofPage.notifications} };
            dbo.collection('Registration').updateOne(condition,newvalues).then(()=>{
                db.close();        
            })
            })
    })});            
module.exports= router;