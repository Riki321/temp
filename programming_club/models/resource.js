// export mongoose model
const mongoose = require('mongoose');
const conn=require('../db/connectdb.js')

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'resource title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: true,
        maxlength: [5000, 'resource description cannot exceed 5000 characters']
    },
    markdown: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        required: false,
    },
    sanitizedHtml:{
        type: String,
        required: true
      },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // }

},{timestamps: true}
);
postSchema.pre("validate", function(next){
    if(this.markdown){
      this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next();
  })
const resourcedb= conn.model('ResourceSchema',ResourceSchema);

module.exports=resourcedb;

// const resourceSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, 'Please enter resource name'],
//         trim: true,
//         maxlength: [100, 'Resource name cannot exceed 100 characters']
//     },
//     description: {
//         type: String,
//         required: [true, 'Please enter resource description'],
//         maxlength: [500, 'Resource description cannot exceed 500 characters']
//     },
//     link: {
//         type: String,
//         required: [true, 'Please enter resource link'],
//         maxlength: [500, 'Resource link cannot exceed 500 characters']
//     },
//     type: {
//         type: String,
//         required: [true, 'Please enter resource type'],
//         enum: {
//             values: [
//                 'Video',
//                 'Book',
//                 'Podcast',
//                 'Article'
//             ],
//             message: 'Please select correct resource type for resource'
//         }
//     },
//     rating: {
//         type: Number,
//         min: [1, 'Rating must be at least 1'],
//         max: [10, 'Rating cannot exceed 10']
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',
//         required: true
//     }
    
// },{timestamps: true}
// );
