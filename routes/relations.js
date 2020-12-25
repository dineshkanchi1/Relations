const express = require('express');
const { model } = require('../models/relations');
const router = express.Router();
const Relations = require('../models/relations');

//Request for users
router.get('/',(req,res)=>{
    Relations.find()
    .then(relation => res.json(relation))
    .catch(err => res.status(400).res.json(`Error: ${err}`))
});

//Request for add user
router.post('/add',(req,res)=>{

    const { username1 , relation, username2 } = req.body;
    const newRelation = new Relations({username1 ,relation , username2})
    newRelation.save()
    .then(()=>res.json("The new Relation is added successfully!"))
    .catch(err => res.status(400).json(`Error : ${err}`));
})

//Request for find user by id
router.get('/:id',(req,res)=>{
    Relations.findById(req.params.id)
    .then(relation => res.json(relation))
    .catch(err => res.status(400).json(`Error : ${err}`));
});


router.put('/update/:id',(req,res)=>{
    Relations.findById(req.params.id)
    .then(relation => {
        relation.username1 = req.body.username1;
        relation.relation = req.body.relation;
        relation.username2 = req.body.username2
        relation.save()
        .then(()=>res.json("Relation is updated successfully!!!"))
        .catch(err => res.status(400).json(`Error : ${err}`));
    })
    .catch(err => res.status(400).json(`Error : ${err}`));
});

router.delete('/:id',(req,res)=>{
    Relations.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Relation is deleted!!!"))
    .catch(err => res.status(400).json(`Error : ${err}`));
})

router.post('/degree',(req,res)=>{
    try{
        const { username1 , username2} = req.body
        
        const relationlist1 = Relations.find({ $or:[ { username1 },{username2:username1}] })
        const relationlist2 = Relations.find({ $or:[ {username2} ,{username1:username2}] })

        if( relationlist1.length === 0 || relationlist2.length === 0) {return res.json({StatusCode:500 , message: "No relation Found"})}

        const arr1 = []
        const arr2 = []

        for(let i= 0; i<relationlist1.length; i++){
            if(relationlist1[i].username1 == username1){
                arr1.push(relationlist1[i].username2)
            }else{
                arr1.push(relationlist1[i].username1)
            }
        }
        for(let i= 0; i<relationlist2.length; i++){
            if(relationlist2[i].username1 == username2){
                arr2.push(relationlist2[i].username2)
            }else{
                arr2.push(relationlist2[i].username1)
            }
        }

         
        const result = arr1.filter(x => arr2.indexOf(x) !== -1)

        function removeItemAll(arr, value) {
            let i = 0;
            while (i < arr.length) {
              if (arr[i] === value) {
                arr.splice(i, 1);
              } else {
                ++i;
              }
            }
            return arr;
          }

        const result1 = removeItemAll(arr1, result[0])
        const result2 = removeItemAll(arr2, result[0])

        let finalResult1 =[];
        finalResult1.push(username1)
        if(result.length !== 0) {finalResult1.push(result[0])}
        finalResult1.push(username2)

        let finalResult2 = [];

        finalResult2.push(username1)
        finalResult2.push(result1[0])
        finalResult2.push(result2[0])
        finalResult2.push(username2)
        res.json({StatusCode: 201 , finalResult1, finalResult2})
    }catch(err){
        throw(err)
    }
})


module.exports = router;