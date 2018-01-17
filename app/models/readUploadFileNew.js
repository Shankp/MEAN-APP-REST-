var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
//define our event model
//module.exports allows us to pass this to other files when it is called
var filesUploadNew= new Schema({
    id:String,
    dat:String,
    tim:String,
    details:String,
    product:String,
    price:String,

  //  space:String
},
{
    versionKey: false
});
module.exports = mongoose.model('filesReadUploadsNews',filesUploadNew);


// app/models/nerd.js
// grab the mongoose module
/*var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('filesReadUpload', {

    _id:{type : String, default: ''},
    dat:{type : String, default: ''},
    details:{type : String, default: ''},
    tim:{type : String, default: ''},
});*/
