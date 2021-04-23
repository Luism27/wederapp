const router = require('express').Router();
const Example = require('../db/model/example');

router.get('/', async (req, res) => {
    const auth = req.currentUser;
    console.log(`auth`, auth)
    if (auth) {
      const phones = await Example.find({});
      return res.json(phones.map((phone) => phone.toJSON()));
    }
    return res.status(403).send('Not authorized');
  });
  
  router.post('/', (req, res) => {
    const auth = req.currentUser;
    if (auth) {
      const phone = new Example(req.body);
      const savedPhone = phone.save();
  
      return res.status(201).json(savedPhone);
    }
    return res.status(403).send('Not authorized');
  });
  
  module.exports = router;