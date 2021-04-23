const mongoose = require('mongoose');
const { country_base } = require('./country_city_base')
const citySchema = new mongoose.Schema({
    city_id: {type:Number, text:true},
    name: {type:String, text:true},
    ascii_name: String,
    country_code: String,
    timezone:String,
    alternative_names:[String],
    country: [country_base]
})
citySchema.index({ name: 'text', city_id: 'text', ascii_name: 'text', time_zone: 'text'  })
citySchema.set('toJSON',{ 
    transform:(doc,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('cities', citySchema);