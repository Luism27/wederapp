const router = require('express').Router();
const userModel = require('../db/model/users');

router.post('/',async (req,res)=>{
    const auth = req.currentUser;
    if(auth){
        console.log(`req.body`, req.body)
        const user = new userModel(req.body);
        const userSaved = user.save();
        return res.status(201).json(userSaved);
    }
    return res.status(403).send('Not authorized');
});

router.get('/:uid', async(req,res)=>{
    const auth = req.currentUser;
    console.log(`auth`, auth)
    if(auth){
        const user = await userModel.findOne({uuid: auth.uid});
        return res.json( user );
    }
    return res.status(403).send('Not authorized');
})

module.exports = router;