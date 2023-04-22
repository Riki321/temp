// export the model
const Resourcedb = require('../models/resource.js');
const Categorydb = require('../models/Category.js');
const { createError } = require('../utils/error.js');

module.exports.compose_get = async (req, res, next) => {
    // if (req.isAuthenticated()) {
    //     res.render("compose", { authenticated: req.isAuthenticated() });
    // } else {
    //     res.send("Please login to write a post.");
    // }
    try {
        res.render('compose');
    } catch (err) {
        next(createError(400, 'cannot render compose page'));
    }
}

// post request
