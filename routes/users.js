const express = require('express');
const { model } = require('../models/users');
const router = express.Router();
const Users = require('../models/users');

//Request for users
router.get('/',(req,res)=>{
    Users.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).res.json(`Error: ${err}`))
});

//Request for add user
router.post('/add',(req,res)=>{
    const newUser = new Users({
        name: req.body.name,
    });

    newUser.save()
    .then(()=>res.json("The new user is added successfully!"))
    .catch(err => res.status(400).json(`Error : ${err}`));
})

//Request for find user by id
router.get('/:id',(req,res)=>{
    Users.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(`Error : ${err}`));
});


router.put('/update/:id',(req,res)=>{
    Users.findById(req.params.id)
    .then(user => {
        user.name = req.body.name;
        user.save()
        .then(()=>res.json("User is updated successfully!!!"))
        .catch(err => res.status(400).json(`Error : ${err}`));
    })
    .catch(err => res.status(400).json(`Error : ${err}`));
});

router.delete('/:id',(req,res)=>{
    Users.findByIdAndDelete(req.params.id)
    .then(()=>res.json("User is deleted!!!"))
    .catch(err => res.status(400).json(`Error : ${err}`));
})


module.exports = router;