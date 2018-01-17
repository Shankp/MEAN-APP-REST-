
// grab the mongoose module
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
//define our event model
//module.exports allows us to pass this to other files when it is called
var eventSchemaNew= new Schema({
    id:String,
    name:String,
    date:String,
    details:[{ amount:Number,address:Number }]
},
{
    versionKey: false
});
module.exports = mongoose.model('eventRead',eventSchemaNew);
