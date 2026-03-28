const express = require('express');
const router = express.Router();
const Model = require('../models/usermodel');
const { model } = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//add
router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});

// getall

// delete
// 

router.get('/getall',(req,res)=>{
    Model.find().then((result) =>{
      res.status(200).json(result);
    })
    .catch((err) =>{
     console.log(err);
     res.status(500).json(err);
     
    });
})
//getbyemail
router.get('/getbyemail/:email',(req,res)=>{
    Model.findOne({email :req.params.email})
    .then((result) =>{
      res.status(200).json(result);
    })
    .catch((err) =>{
     console.log(err);
     res.status(500).json(err);
     
    });
})

//delete
router.delete('/delete/:id',(req,res)=>{
    Model.findByIdAndDelete(req.params.id)
    .then((result) =>{
      res.status(200).json(result);
    })
    .catch((err) =>{
     console.log(err);
     res.status(500).json(err);
     
    });

});


//update
router.put('/update/:id',(req,res)=>{
    Model.findByIdAndUpdate(req.params.id, req.body , {new:true})
    .then((result) =>{
      res.status(200).json(result);
    })
    .catch((err) =>{
     console.log(err);
     res.status(500).json(err);
     
    });

});

//get by city
router.get('/getbycity/:city',(req,res)=>{
    Model.findOne({city :req.params.city})
    .then((result) =>{
      res.status(200).json(result);
    })
    .catch((err) =>{
     console.log(err);
     res.status(500).json(err);
     
    });
})

//get by id
router.get('/getbyid/:id',(req,res)=>{
    Model.findById(req.params.id)
    .then((result) =>{
      res.status(200).json(result);
    })
    .catch((err) =>{
     console.log(err);
     res.status(500).json(err);
     
    });
});


router.post('/authenticate',(req,res)=>{
 const {email, password } = req.body;
  Model.findOne({ email, password })
  .then((result) => {

    if (result){
      const { _id, email} = result;

      jwt.sign({_id, email },
        process.env.JWT_SECRET,
        {expiresIn: '6d'},
        (err, token) => { 
          if(err){
            console.log(err);
            res.status(500).json({message: 'error creating token'})
          } else{
            res.status(201).json({ token })
          }
        }

      )
    }else{
      res.status(403).json({message:'credentials Invalid'});
    }

  }).catch((err) => {
    console.log(err);
    req.status(500).json(err);
  });

});



module.exports = router;