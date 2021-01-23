var express = require('express');
const { response } = require('../app');
const usersHelpers = require('../public/javascripts/users-helpers');
var router = express.Router();
var productHelpers=require('../public/javascripts/users-helpers')

/* GET admin listing. */

let admin = { email: "sample@gmail.com", password: "123" }

 router.get('/admin-login', (req, res) => {
   usersHelpers.getAllUserDetails().then((details)=>{
     console.log(details);
    
    
    res.render('admin',{details})
   })

})




// router.get('/admin-login', (req, res) => {
  
//   let user = req.session.user
//   if (user) {
//     res.render('admin',{username:user})
//   } else {
//      res.redirect('/admin-login')  
//   }
// })

router.get('/admin', (req, res) => {
  if(req.session.admin){
    
    res.render('admin',{users})
    
  
  }else{
  
    res.render('admin-log')
   
  }
  
  })

  router.get('/admin-logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/admin')
    })


router.post("/admin-login", (req, res) => {
  
  if (req.body.email === admin.email && req.body.password === admin.password) {
    req.session.admin=req.body.email;
  
  //  console.log(req.session.user);
 // res.json({status:true})
      res.redirect('/admin-login' )
       
       
 
   
//  res.render('home',{product})
  } else {
   //res.json({status:false})
   
    res.redirect('/admin')
   
  }
});



router.get('/admin-logout', (req, res) => {
  res.redirect('/admin-log')
  })
// router.get('/delete/:id',(req,res)=>{
// let prold=req.query.id;
// usersHelpers.deletedetails(prold).then((response)=>{
//   console.log(proid);
// res.redirect('/admin')
// })
// })
router.get('/delete/:id', (req, res) => {
  let userid=req.params.id;
  usersHelpers.deletedetails(userid).then((data)=>{
    res.redirect('/admin-login')
  })

})

router.get('/edit/:id',async (req, res) => {
  let users= await usersHelpers.getUserDetails(req.params.id)
  //console.log(users);

   
    res.render('edit-admin',{users})
  })


router.post('/edit/details:id',(req,res)=>{
usersHelpers.updateDetails(req.params.id,req.body).then(()=>{
  res.redirect('/admin-login')
})
})







module.exports = router;
