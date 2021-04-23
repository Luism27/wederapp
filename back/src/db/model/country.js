const { city_base } = require( './country_city_base');
const mongoose = require('mongoose');


const countrySchema = new mongoose.Schema({
    iso:String,
    country:String,
    capital:String,
    currency_code:String,
    currency_name:String,
    currency_symbol:String,
    phone:String,
    postal_code_format:String,
    postal_code_regex:String,
    languajes: [String],
    country_id: Number,
    cities: [city_base]
})

countrySchema.set('toJSON',{
    transform:(doc,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('countries', countrySchema);