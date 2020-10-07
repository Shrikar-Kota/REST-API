const express = require('express');
const { disable } = require('../../app');

const router=express.Router();

 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/api-db";

   
router.post('/:ReportId',(req,res,next)=>{

    var BodyofPage;
     
    const report_body={
        worker_id: parseInt(req.body.worker_id),
        _id: parseInt(req.params.ReportId),
        content: req.body.content,
        date: new Date(),
        status: "Report submitted"
    };
    var notif_body={
        seen: "0",
        content: "",
        date: new Date()
    };

    /*    // Data Finding 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("api-db");
        var condition={_id: body._id};  
        var cursor=dbo.collection('customers').find(condition);
        cursor.forEach(element => {
        console.log(element);
        BodyofPage.push(element);   
        },function(){
            db.close();
            res.status(200).json(BodyofPage[0]);
        });
})*/
MongoClient.connect(url, function(err, db) {
    if (err) {//pass
    };
   var dbo = db.db("api-db");
    dbo.collection('Reports-posted').insertOne(report_body,(err,result)=>{
        if (err) {//pass
        };
        BodyofPage=report_body
        dbo.collection('Registration').findOne({_id: report_body.worker_id},(err,Result)=>{
            if (err) {
                //pass
            };
            console.log(Result);
            notif_body.content=report_body.status+` Report-id ${report_body._id}`;
            Result.notifications.push(notif_body);
            var up={$set:{notifications: Result.notifications}};
            dbo.collection('Registration').updateOne({_id: report_body.worker_id},up,(err,result)=>{
                if (err) {
                    //pass
                };
                
                db.close();    
               res.status(200).json(BodyofPage);
            })
        }
        )
        
    });    
})});
 
    module.exports= router;