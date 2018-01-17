
// grab the mongoose module
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
//define our event model
//module.exports allows us to pass this to other files when it is called
var eventSchema= new Schema({
    id:String,
    name:String,
    time:{
        start:Number,end:Number
        }
},
{
    versionKey: false
});
module.exports = mongoose.model('events',eventSchema);
