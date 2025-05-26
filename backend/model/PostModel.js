const mongoose = require('mongoose');


const postModel = new  mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    imageBuffer:{
        type:Buffer,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    news:{
        type:String,
        enum:['government','games','education','technology','celebrity','music'],
        default:'government'
    }

})

const Post = mongoose.model('post',postModel);

module.exports = Post