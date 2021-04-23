const router = require('express').Router();
const axios = require('axios');
const { config } = require('../config')
router.get('/searchNowById/:id',async (req,res)=>{
    const auth = req.currentUser;
    // if(auth){
        try {
            const weatherNow = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${config.weatherApi}&q=${req.params.id}&aqi=no`);
            return res.json( weatherNow.data );
        } catch (error) {
            console.log(`error`, error)
            return res.status(500).send('Error al consultar en la api de clima');
            
        }
    // }
    // return res.status(403).send('Not authorized');
})

router.get('/forecast/:id',async (req,res)=>{
    const auth = req.currentUser;
    // if(auth){
        try {
            const weatherFore = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${config.weatherApi}&q=${req.params.id}&days=3&aqi=no&alerts=no`);
            return res.json( weatherFore.data );
        } catch (error) {
            console.log(`error`, error)
            return res.status(500).send('Error al consultar en la api de clima');
            
        }
    // }
    // return res.status(403).send('Not authorized');

})


router.get('/history/:date/:name',async (req,res)=>{
    const auth = req.currentUser;
    // if(auth){
        try {
            const weatherHist = await axios.get(`http://api.weatherapi.com/v1/history.json?key=${config.weatherApi}&q=${req.params.name}&dt=${req.params.date}`);
            return res.json( weatherHist.data );
        } catch (error) {
            console.log(`error`, error)
            return res.status(500).send('Error al consultar en la api de clima');
            
        }
    // }
    // return res.status(403).send('Not authorized');

})


module.exports = router;