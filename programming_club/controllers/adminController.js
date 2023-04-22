const admindb = require('../models/admin.js');
// const Categorydb = require('../models/Category.js');
const { createError } = require('../custom_error/error.js');
const Userdb = require('../models/User');

module.exports.admin_auth_get = async (req, res, next) => {
    try {
        const user = await Userdb.findById(req.params.id);
        if (!user) {
            return next(createError(400, 'admin not found'));
        }
        // res.status(200).json({
        //     status: 'success',
        //     data: admin,
        // });
        res.render('admin',
        {
            user_id:user._id,
        });
    } catch (err) {
        next(err);
    }
};

module.exports.admin_auth_post = async (req, res, next) => {
    // try {
    //     const admin = await admindb.create({
    //         username: req.body.username,
    //         password: req.body.password,
    //     });
    //     if (!admin) {
    //         return next(createError(400, 'admin not created'));
    //     }
    //     res.status(200).json({
    //         status: 'success',
    //         data: admin,
    //     });
    // } catch (err) {
    //     next(err);
    // }
    let errors = [];
    try {
        const user=await Userdb.findById(req.params.id);
        if(!user){
            errors.push({msg:'User not found'});
        }
        const admin_pass_front=req.body.admin_pass_front;
        // comopare the password form .env file
        if (admin_pass_front === process.env.admin_password) {
            const admindb=await admindb.create({
                name:user.name,
                email:user.email,
                password:user.password,
                programe:user.programe,
                batch:user.batch,
                admin_password:process.env.admin_password,
                });
            res.redirect('/dashboard');
        }
        else{
            errors.push({msg:'Admin password is incorrect'});
            res.render('admin',
            {
                errors,
            });
        }

    } catch (error) {
        
    }
};

