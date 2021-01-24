var express = require('express');
const { compile } = require('morgan');
const { render, response } = require('../app');
var router = express.Router();
var usersHelpers=require('../public/javascripts/users-helpers')

 
 router.get('/home', function (req, res) {
   let user = req.session.user
  if (user) { 
    res.render('home',{username:user,product})
   } else {
    
     res.render('login-form');
   }
  
  
});
let product= [
  {
      name:'Apple iphone XR',
      image:'https://rukminim1.flixcart.com/image/612/612/jnj7iq80/mobile/3/f/a/apple-iphone-xr-mry62hn-a-original-imafa6zkhyceh8dg.jpeg?q=70',
      desc:'This is new Iphone XR'
  },
  {
      name:'Apple iphone 11pro',
      image:'https://rukminim1.flixcart.com/image/312/312/k2jbyq80pkrrdj/mobile-refurbished/z/a/f/iphone-11-pro-max-256-u-mwhm2hn-a-apple-0-original-imafkg2ftc5cze5n.jpeg?q=70',
      desc:'This is new Iphone 11 pro'
  },{
      name:'Apple iphone 12pro',
      image:'https://rukminim1.flixcart.com/image/312/312/kg8avm80/mobile/y/7/n/apple-iphone-12-dummyapplefsn-original-imafwg8dqq7z8cgh.jpeg?q=70',
      desc:'This is new Iphone 12pro'
  },
  {
      name:'Apple iphone 12',
      image:'https://rukminim1.flixcart.com/image/312/312/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8dhe5aeyhk.jpeg?q=70',
      desc:'This a new Iphone 12'
  },

  {
      name:'Asus Rog 3',
      image:'https://rukminim1.flixcart.com/image/312/312/kcuug7k0/mobile/g/h/e/asus-rog-phone-3-zs661ks-6a006in-original-imaftwc6nmyuyekd.jpeg?q=70',
      desc:'This is new Asus Rog 3 (128 GB)'
  },
  
  {
      name:'Redmi K20 pro',
      image:'https://rukminim1.flixcart.com/image/612/612/jxz0brk0/mobile/q/z/8/redmi-k20-pro-na-original-imafgb4ys5unqagx.jpeg?q=70',
      desc:'This is new Redmi K20 pro'
  }

]

// let user = { name: "shahid", password: "12345" }

// router.get('/login', (req, res) => {
//   let user = req.session.user
//   if (user) {
//     res.render('home',{username:user,product})
//   } else {
//      res.redirect('/')  
//   }
// })




// router.post("/login", (req, res) => {

//   if (req.body.username == user.name && req.body.password == user.password) {
//    req.session.user=req.body.username;
//   //  console.log(req.session.user);
//     //  res.send('home', { product })
//        res.json({status:true})
   
// //  res.render('home',{product})
//   } else {
// // res.redirect('/')
//    res.json({status:false})
//   }
// });




router.get('/',(req,res)=>{
  if(req.session.loggedIn){
      res.render('home',{product})
    
      }else
      
         res.render('login-form')
   
// res.render('index')
  
})

// router.get('/login',(req,res)=>{
  
//    if(req.session.loggedIn){
//   res.render('home')
//   }else
  
//     res.redirect('/')
//   })



router.get('/logout-user',(req,res)=>{
req.session.destroy()
res.redirect('/')
})


router.get('/signup',(req,res)=>{
res.render('signup')
})

router.post('/user-signup',(req,res)=>{
  console.log(req.body);
  usersHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    res.render('login-form')
  })
  })



  router.post('/login',(req,res)=>{
    
    usersHelpers.doLogin(req.body).then((response)=>{
      
if(response.status){
  console.log('qwerty');
  req.session.loggedIn=true
  req.session.user=response.user
  res.json({status:true})

  res.render('home',{product})
}else{
  res.json({status:false})
  res.redirect('/')  
  
}
})
  })



  


module.exports = router;
