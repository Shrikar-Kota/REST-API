const express = require('express');

const router=express.Router();

 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/api-db";

   
router.post('/:PersonId',(req,res,next)=>{

    var BodyofPage;
    const body = {
		Date: new Date(),
        email : req.body.email,
        _id : parseInt(req.params.PersonId),
        notifications: [{
            seen: "0",
            content: "Welcome to the Portal",
            date: new Date()
        }]
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
    dbo.collection('Registration').insertOne(body,(err,result)=>{
        if (err) {//pass
        };
        res.status(200).json({Out: "Account Creation Succesful"});
        
    });  
    db.close();  
})});

module.exports= router;