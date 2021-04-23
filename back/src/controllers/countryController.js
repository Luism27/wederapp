const router = require('express').Router();
const countryModel = require('../db/model/country');

router.get('/',async (req,res)=>{
    try {
        const countries = await countryModel.find().sort({country:1});
        return res.json(countries.map((country) => country.toJSON()));
    } catch (error) {
        console.log(`error`, error)
        return res.status(500).send('error al consultar countries');
    }
})

router.get('/findById/:country_id',async (req,res)=>{
    try {
        console.log(`req.params.country_id`, req.params.country_id)
        const country = await countryModel.findOne({country_id:req.params.country_id});
        return res.json(country);
    } catch (error) {
        console.log(`error`, error)
        return res.status(500).send('error al consultar countries');
    }
})

module.exports = router;