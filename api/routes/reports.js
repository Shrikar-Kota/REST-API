const express = require('express');

const router=express.Router();

 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/api-db";

   
router.get('/',(req,res,next)=>{
    const BodyofPage=[];
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
   var dbo = db.db("api-db"); 
    dbo.collection('Reports-posted').find().toArray((err,result)=>{
        if (err) throw err;
        db.close();
        for(var x in result){
            BodyofPage.push(result[x]);
        }
        res.status(200).json({BodyofPage});
    })})});

router.get('/:WorkerId',(req,res,next)=>{
        const BodyofPage=[];
    MongoClient.connect(url, function(err, db) {
        if (err) {
            //pass
        };
       var dbo = db.db("api-db"); 
        dbo.collection('Reports-posted').find({worker_id: parseInt(req.params.WorkerId)}).toArray((err,result)=>{
            if (err) {
                //pass
            };
            db.close();
            for(var x in result){
                BodyofPage.push(result[x]);
            }
            res.status(200).json({BodyofPage});
        })

              
})});  

module.exports= router;