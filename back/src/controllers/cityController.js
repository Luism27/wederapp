const router = require('express').Router();
const cityModel = require('../db/model/city');

router.get('/searching/:search',async (req,res)=>{
    try {
        console.log(`search`, req.params.search)
        
        const cities = await cityModel.find({$text: { $search: `${req.params.search}` } },{ score : { $meta: "textScore" } });
        console.log(`cities`, cities)
        return res.json(cities.map((city) => city.toJSON()));
    } catch (error) {
        console.log(`error`, error)
        return res.status(500).send('error al consultar countries');
    }
})

router.get('/:city_id',async (req,res)=>{
    try {
        console.log(`req.params.city_id`, req.params.city_id)
        const cities = await cityModel.findOne({city_id:req.params.city_id});
        return res.json(cities);
    } catch (error) {
        console.log(`error`, error)
        return res.status(500).send('error al consultar cities');
    }
})
router.get('/cityName/:name',async (req,res)=>{
    try {
        const cities = await cityModel.findOne({name:req.params.name});
        return res.json(cities);
    } catch (error) {
        console.log(`error`, error)
        return res.status(500).send('error al consultar cities');
    }
})
module.exports = router;