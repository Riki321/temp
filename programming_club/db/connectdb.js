const mongoose = require('mongoose');

// const connectdb = (url) => {
//     return mongoose.connect(url);
// }



// module.exports=connectdb;
const connectdb = mongoose
    .createConnection(process.env.MONGO_URI);
module.exports = connectdb;