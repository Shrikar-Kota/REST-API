const express = require('express');

const router=express.Router();

 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/api-db";

   
router.get('/:ReportId',(req,res,next)=>{
    var BodyofPage;
    var notif_body={
        seen: "0",
        content: "",
        date: new Date()
    };
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
   var dbo = db.db("api-db");
   var condition={_id: parseInt(req.params.ReportId)};      
        dbo.collection('Reports-posted').findOne(condition,(err,result)=>{
            if (err){//pass}
        }
            result.status=`Test Finished`;
            notif_body.content=result.status+` (Report Id : ${result._id})`;
            BodyofPage=result;
            dbo.collection('Registration').findOne({_id: BodyofPage.worker_id},(err,Result)=>{
                if (err) {//pass};
            }
                console.log(Result);
                Result.notifications.push(notif_body);
                var details={$set: {notifications: Result.notifications}};
                dbo.collection('Registration').updateOne({_id: BodyofPage.worker_id},details)
                var last={$set: {status: BodyofPage.status}}
                dbo.collection('Reports-posted').updateOne(condition,last).then(()=>{
                console.log("help");
                db.close();
                res.status(200).json(notif_body);
        });    
        });         
})})  
});

module.exports= router;