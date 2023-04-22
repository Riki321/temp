const express = require('express');
const router = express.Router();
const passport = require('passport');
router.use(express.static('public'));
const { ensureAuthenticated, isAdmin } = require('../config/auth');

//Load User model
const User = require('../models/User');

router.get(
  '/',
  (req, res) => res.render('admin')
  //console.log(req.user)
);

// admin Login
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/',
    failureFlash: true,
  })(req, res, next);
});

router.get(
  '/dashboard',
  isAdmin,
  (req, res) =>
    res.render('admin_dashboard', {
      user: req.user,
    })
  //console.log(req.user)
);

router.get(
  '/event',
  isAdmin,
  (req, res) =>
    res.render('manage_admin', {
      user: req.user,
    })
  //console.log(req.user)
);

router.get('/add_admin', isAdmin, (req, res) =>
  res.render('add_admin', { user: req.user })
);

router.get('/delete_admin', isAdmin, (req, res) =>
  res.render('delete_admin', { user: req.user })
);

//adminlogout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/admin/');
  });
});

// Add Admin
router.post('/add_admin', (req, res) => {
  //console.log(req.body);
  // res.send('hello');
  const { email } = req.body;
  let errors = [];

  //console.log(programe);
  //check required fields
  if (!email) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //check email id of daiict
  if (
    email.substr(-13, 13) != '@daiict.ac.in' ||
    email[1] != '0' ||
    email[0] != '2' ||
    !(email[4] == '0' || email[4] == '1' || email[4] == '2') ||
    !(
      email[5] == '0' ||
      email[5] == '1' ||
      email[5] == '2' ||
      email[5] == '3'
    ) ||
    email[6] >= '6'
  ) {
    errors.push({ msg: 'Please Register using correct daiict Id' });
  }

  if (errors.length > 0) {
    res.render('add_admin', {
      errors,
    });
  } else {
    //res.send('pass');
    User.findOne({ email: email }).then((user) => {
      if (user) {
        try {
          change = async (req, res) => {
            await User.updateOne(
              {
                _id: user.id,
              },
              {
                $set: {
                  isadmin: true,
                  ismember: true,
                },
              }
            );
          };
          change();

          res.redirect('/admin/dashboard');
        } catch (error) {
          console.log(error);
          //res.send('Not verified');
          res.json({ status: 'Something went wrong' });
        }
      } else {
        errors.push({ msg: 'Email not exists' });
        res.render('add_admin', {
          errors,
        });
      }
    });
  }
});

router.post('/delete_admin', (req, res) => {
  //console.log(req.body);
  // res.send('hello');
  const { email } = req.body;
  let errors = [];

  //console.log(programe);
  //check required fields
  if (!email) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //check email id of daiict
  if (
    email.substr(-13, 13) != '@daiict.ac.in' ||
    email[1] != '0' ||
    email[0] != '2' ||
    !(email[4] == '0' || email[4] == '1' || email[4] == '2') ||
    !(
      email[5] == '0' ||
      email[5] == '1' ||
      email[5] == '2' ||
      email[5] == '3'
    ) ||
    email[6] >= '6'
  ) {
    errors.push({ msg: 'Please Register using correct daiict Id' });
  }

  if (errors.length > 0) {
    res.render('delete_admin', {
      errors,
    });
  } else {
    //res.send('pass');
    User.findOne({ email: email }).then((user) => {
      if (user) {
        try {
          change = async (req, res) => {
            await User.updateOne(
              {
                _id: user.id,
              },
              {
                $set: {
                  isadmin: false,
                  ismember: false,
                },
              }
            );
          };
          change();

          res.redirect('/admin/dashboard');
        } catch (error) {
          console.log(error);
          //res.send('Not verified');
          res.json({ status: 'Something went wrong' });
        }
      } else {
        errors.push({ msg: 'Email not exists' });
        res.render('delete_admin', {
          errors,
        });
      }
    });
  }
});

module.exports = router;
