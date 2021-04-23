const exampleRoutes = require('../controllers/example');
const userRoutes = require('../controllers/userController');
const countryRoutes = require('../controllers/countryController');
const cityRoutes = require('../controllers/cityController');
const weatherRoutes = require('../controllers/weatherController')
const favoriteRoutes = require('../controllers/favoriteController')

const routes = function(app){
    console.log("HOLAAAA");
    const prefix = "api";
    app.use(`/${prefix}/example`,exampleRoutes);
    app.use(`/${prefix}/users`, userRoutes);
    app.use(`/${prefix}/countries`,countryRoutes);
    app.use(`/${prefix}/cities`, cityRoutes);
    app.use(`/${prefix}/weather`, weatherRoutes)
    app.use(`/${prefix}/favorites`, favoriteRoutes)
    
}

module.exports = routes;



