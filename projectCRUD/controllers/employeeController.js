var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Employee =mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render('employee/addOrEdit',{
        viewTitle:"Insert Employee"
    });
})
 
router.post('/',(req,res)=>{
//    console.log("reqqqq",req)
    if(req.body.id =='')
    insertRecord(req,res)
     else{
    updateRecord(req,res)
}
});

function updateRecord(req,res){
    
    Employee.findOneAndUpdate({ _id: req.body.id}, req.body, {new: true}, (err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log("Error during record update"+err)
        }
    })
}
function insertRecord(req,res){
    var employee=new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.city = req.body.city;
    employee.mobile = req.body.mobile;
    employee.save((err,doc)=>{
        if(!err)
        res.redirect('employee/list');
        else{
            console.log("Error during record insertion"+err)
        }
    });
}

router.get('/list',(req,res)=>{
 //   res.json('from list');
    Employee.find((err,docs)=>{
        if(!err){
            res.render("employee/list",{
                list: docs
            });
        }
        else{
            console.log("Error in retrieving employee list :"+err)
        }
    })
})

router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle: "Update Employee",
                employee: doc
            })
        } 
    })
})

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err)
            res.redirect('/employee/list')
        else
        console.log("error in employee delete"+err)
    });
})
module.exports= router;