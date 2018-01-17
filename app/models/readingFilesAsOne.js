
// grab the mongoose module
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
//define our event model
//module.exports allows us to pass this to other files when it is called
var filesAsOne= new Schema({
    id:String,
    details:String,

},
{
    versionKey: false
});
module.exports = mongoose.model('readFilesAsOne',filesAsOne);
