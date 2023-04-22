const express = require('express');
const router = express.Router();
router.use(express.static('public'));
const { ensureAuthenticated } = require('../config/auth');

//Load User model
const User = require('../models/User');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
//router.get('/dashboard', (req, res) => res.render('dashboard'));

router.get(
  '/dashboard',
  ensureAuthenticated,
  (req, res) =>
    res.render('dashboard', {
      user: req.user,
    })
  //console.log(req.user)
);

// res.render('dashboard', {
//   name: req.user.name,
// })
//);

//Profile
router.get(
  '/profile',
  ensureAuthenticated,
  (req, res) =>
    res.render('profile.ejs', {
      user: req.user,
    })
  //console.log(req.user.name)
);

router.get(
  '/event',
  ensureAuthenticated,
  (req, res) =>
    res.render('event.ejs', {
      user: req.user,
    })
  //console.log(req.user.name)
);

router.get(
  '/admin',
  (req, res) => res.render('admin', {})
  //console.log(req.user)
);

//edit Profile
router.get(
  '/edit_profile',
  ensureAuthenticated,
  (req, res) =>
    res.render('edit_profile.ejs', {
      user: req.user,
    })
  //console.log(req.user.name)
);

// router.post(
//   '/edit_profile',
//   (req, res) => res.redirect('/profile')
//   //console.log(req.user.name)
// );

router.post('/edit_profile', (req, res) => {
  console.log(req.body);
  // res.send('hello');
  const { name, email, programe, batch, cfprofile, address } = req.body;
  // let errors = [];

  // // //console.log(programe);
  // // //check required fields
  // if (!name || !email || programe == '0' || batch == '0') {
  //   errors.push({ msg: 'Please enter all fields' });
  // }

  // //check email id of daiict
  // if (
  //   email.substr(-13, 13) != '@daiict.ac.in' ||
  //   email[1] != '0' ||
  //   email[0] != '2' ||
  //   !(email[4] == '0' || email[4] == '1' || email[4] == '2') ||
  //   !(
  //     email[5] == '0' ||
  //     email[5] == '1' ||
  //     email[5] == '2' ||
  //     email[5] == '3'
  //   ) ||
  //   email[6] >= '6'
  // ) {
  //   errors.push({ msg: 'Please Register using correct daiict Id' });
  // }

  // if (errors.length > 0) {
  //   res.render('edit_profile', {
  //     errors,
  //   });
  // } else {
  //res.send('pass');
  User.findOne({ email: email }).then((user) => {
    console.log(user);
    try {
      change = async (req, res) => {
        await User.updateOne(
          {
            _id: user.id,
          },
          {
            $set: {
              name: name,
              programe: programe,
              batch: batch,
              cfprofile: cfprofile,
              address: address,
            },
          }
        );
      };
      change();

      //have to update session data ------------------------------------

      res.redirect('/profile');
    } catch (error) {
      console.log(error);
      //res.send('Not verified');
      res.json({ status: 'Something went wrong' });
    }
  });
  //}
});

module.exports = router;
