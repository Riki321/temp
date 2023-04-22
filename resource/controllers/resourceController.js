// export the model
const Resourcedb = require('../models/resource.js');
const Categorydb = require('../models/Category.js');
const {createError}=require('../utils/error.js');

//get request
module.exports.Resource_get_all=async(req,res,next)=>{
    try{
        const resource=await Resourcedb.find();
        if(!resource){
            return next(createError(400,'Resource not found'));
        }
        res.status(200).json({
            status:'success',
            data:resource
        });
        // render resource page
        // res.render('./views/resource.ejs',
        // {
        //     resource:resource,
        //     title:'Resource',
        //     // layout:'./layouts/main',
        //     });
    }catch(err){
        next(err);
    }
}
module.exports.Resource_get=async(req,res,next)=>{
    try{
        const resource=await Resourcedb.findById(req.params.id);
        if(!resource){
            return next(createError(400,'Resource not found'));
        }
        res.status(200).json({
            status:'success',
            data:resource
        });
        // render resource page
        // res.render('./views/resource.ejs',
        // {
        //     resource:resource,
        //     title:'Resource',
        //     // layout:'./layouts/main',
        //     });
    }catch(err){
        next(err);
    }
}

// // get all request
// module.exports.Resource_get_all=async(req,res,next)=>{
//     const username=req.query.username;
//     const category=req.query.category;
//     try{
//         let all_resource;
//         if(username){
//             all_resource=await resourcedb.find({username:username});
//         }else if(category){
//             all_resource=await resourcedb.find({
//                 categories:{
//                     $in:[category],
//                 },
//             });
//         }else{
//             all_resource=await resourcedb.find();
//         }
//         res.status(200).json({
//             status:'success',
//             data:all_resource
//         });
//     }catch(err){
//         next(err);
//     }
// }

// module.exports.Resource_post=async(req,res,next)=>{
//     try{
//         const resource=await Resourcedb.create(req.body);
//         if(!resource){
//             return next(createError(400,'Resource not created'));
//         }
//         res.status(200).json({
//             status:'success',
//             data:resource
//         });
//     }catch(err){
//         next(err);
//     }
// }
module.exports.Resource_post=async(req,res,next)=>{
    try{
        const resource=await Resourcedb.create(req.body);
        if(!resource){
            return next(createError(400,'Resource not created'));
        }
        res.status(200).json({
            status:'success',
            data:resource
        });
        // res.render('./views/resource.ejs',
        // {
        //     resource:resource
        // });
    }catch(err){
        next(err);
    }
}

// // put request
// module.exports.Resource_put=async(req,res,next)=>{
//     try {
//         const resource =await resourcedb.findById(req.params.id);
//         if(!resource){
//             return next(createError(400,'Resource not found'));
//         }
//         if(resource.username===req.body.username){
//             try {
//                 const updatedResource=await resourcedb.findByIdAndUpdate(req.params.id,{
//                     $set:req.body
//                 },{new:true});
//                 res.status(200).json(updatedResource);
//             } catch (error) {
//                 next(createError(400,'Resource is not updated'));
//             }
//         }else{
//             next(createError(400,'You can update only your resource'));
//         }
        

//     } catch (error) {
//         next(createError(400,'Resource is not updated'));
//     }
// }


// // delete request
// module.exports.Resource_delete=async(req,res,next)=>{
//     try {
//         const resource =await resourcedb.findById(req.params.id);
//         if(!resource){
//             return next(createError(400,'Resource not found'));
//         }
//         if(resource.username===req.body.username){
//             try {
//                 await resource.delete();
//                 res.status(200).json("resource has been deleted");
//             } catch (error) {
//                 next(createError(400,'Resource is not deleted'));
//             }
//         }else{
//             next(createError(400,'You can delete only your resource'));
//         }
        

//     } catch (error) {
//         next(createError(400,'Resource is not deleted'));
//     }
// }