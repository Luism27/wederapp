const mongoose = require('mongoose');

const city_base = new mongoose.Schema({
    city_id: Number,
    name:String,
})

const country_base = new mongoose.Schema({
    country_id:Number,
    iso:String,
    country:String,
    currency_code:String,
    currency_symbol:String
})

const citySchema = new mongoose.Schema({
    city_id: Number,
    name: String,
    ascii_name: String,
    country_code: String,
    timezone:String,
    alternative_names:[String],
    country: [country_base]
})
module.exports = {
    city_base,
    country_base,
    citySchema,
}