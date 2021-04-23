const mongoose = require('mongoose');
const { citySchema } = require('./country_city_base')


const favoriteSchema = new mongoose.Schema({
    city: citySchema,
    city_id: Number,
    uuid: String,
})

favoriteSchema.set('toJSON',{ 
    transform:(doc,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('favorite', favoriteSchema);