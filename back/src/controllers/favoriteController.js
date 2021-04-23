const router = require('express').Router();
const favoriteModel = require('../db/model/favorite');

router.post('/',async (req,res)=>{
    const auth = req.currentUser;
    if(auth){
        console.log(`req.body`, req.body)
        const user = new favoriteModel(req.body);
        const userSaved = user.save();
        return res.status(201).json(userSaved);
    }
    return res.status(403).send('Not authorized');
});

router.get('/favoriteByUserId/:uid', async(req,res)=>{
    const auth = req.currentUser;
    console.log(`auth`, auth)
    if(auth){
        const favorites = await favoriteModel.find({uuid: req.params.uid});
        return res.json( favorites.map((favorite) => favorite.toJSON()));
    }
    return res.status(403).send('Not authorized');
})

router.get('/favoriteByCityId/:id', async (req,res)=>{
    const auth = req.currentUser;
    console.log(`auth`, auth)
    if(auth){
        const favorite = await favoriteModel.findOne({city_id: req.params.id});
        return res.json( favorite );
    }
    return res.status(403).send('Not authorized');
})

router.get('/favoriteByCityAndUserId/:cityId/:userId', async (req,res)=>{
    const auth = req.currentUser;
    console.log(`auth`, auth)
    if(auth){
        const favorite = await favoriteModel.findOne({city_id: req.params.cityId, uuid: req.params.userId});
        return res.json( favorite );
    }
    return res.status(403).send('Not authorized');
})

router.delete('/favoriteDeleteById/:city_id/:uid', async (req,res)=>{
    const auth = req.currentUser;
    console.log(`auth from controller`, auth)
    if(auth){
        console.log(`req.params.uid`, req.params.uid)
        console.log(`req.params.city_id`, req.params.city_id)
        const result = await favoriteModel.findOneAndDelete({uuid: req.params.uid, city_id: req.params.city_id});
        return res.json( true );
    }
    return res.status(403).send('Not authorized');
})

module.exports = router;