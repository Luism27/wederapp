const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    name: String,
    otherField:String,
})

exampleSchema.set('toJSON',{
    transform:(doc,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = mongoose.model('Example', exampleSchema);