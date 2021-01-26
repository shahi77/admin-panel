var express = require('express');
const { response } = require('../app');
const usersHelpers = require('../public/javascripts/users-helpers');
var router = express.Router();
var productHelpers = require('../public/javascripts/users-helpers')

/* GET admin listing. */

let admin = { email: "sample@gmail.com", password: "123" }

router.get('/admin-login', (req, res) => {
  usersHelpers.getAllUserDetails().then((details) => {
    console.log(details);


    res.render('admin-login-for', { details })
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


router.get('/admin', function (req, res) {
  let user = req.session.admin
  usersHelpers.getAllUserDetails().then((details) => {
    console.log(details);
    if (user) {
      res.render('admin-panel', { details })
    } else {

      res.render('admin-login-form');
    }


  })

})



// router.get('/admin', (req, res) => {

//   let admin = req.session.admin
//   usersHelpers.getAllUserDetails().then((details) => {
//     console.log(details);
//     if (admin) {
//       res.render('admin-panel', { details })
//     } else {



//       res.render('admin-login-form')


//     }



//   })
// })


router.get('/admin-logout', (req, res) => {
  console.log("SESSION0",req.session);
    req.session.admin=null
  res.redirect('/admin')
})


router.post("/admin-login", (req, res) => {
  usersHelpers.getAllUserDetails().then((details) => {
    console.log(details);




    if (req.body.email === admin.email && req.body.password === admin.password) {
      req.session.admin = req.body.email;

      console.log(req.body.email, req.body.password);
      res.send({ status: true })
      res.render('admin-panel', { details })

      //     req.session.logged=true
      // req.session.admin=response.admin 




    } else {
      res.send({ status: false })

      res.redirect('/admin')


    }
  });

})

// router.get('/admin-logout', (req, res) => {
//   req.session.destroy()
//   res.redirect('/admin-login-form')
// })

router.get('/delete/:id', (req, res) => {
  let userid = req.params.id;
  usersHelpers.deletedetails(userid).then((data) => {
    res.redirect('/admin')
  })

})

router.get('/edit/:id', async (req, res) => {
  let users = await usersHelpers.getUserDetails(req.params.id)



  res.render('edit-admin', { users })
})


router.post('/edit/details:id', (req, res) => {
  usersHelpers.updateDetails(req.params.id, req.body).then(() => {
    res.redirect('/admin')
  })
})

module.exports = router;
