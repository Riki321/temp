// export the model
const Resourcedb=require('../models/resource.js');
const {createError}=require('../utils/error.js');

module.exports.Resource_post=async(req,res,next)=>{
    try{
        const resource=await Resourcedb.create(req.body);
        res.status(201).json({
            success:true,
            data:resource
        });
    }catch(err){
        next(err);
    }
}