var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
//define our event model
//module.exports allows us to pass this to other files when it is called
var words= new Schema({

    id:String,
    word:String,

  //  space:String

},
{
    versionKey: false
});
module.exports = mongoose.model('wordsRead',words);
