import React, {useEffect,useState} from 'react'
// import axios from 'axios'
import { getExample } from '../services/token'
import fire from '../config/fire';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCitiesByCityId } from '../services/city';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { getWeatherInfoById } from '../services/weather';
const useStyles = makeStyles({
    root: {
      minWidth: 400,
      maxWidth: 600,
      marginTop: 100,
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
    },
  });
const Home = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser,logOut } = useAuth();
    const [city, setCity] = useState();
    const  [iso, setIso] = useState('')
    const [countryName, setCountryName] = useState('')
    const [weather, setWeather] = useState();
    const loadCity = async()=>{
        console.log(`currentUser from HOME`, currentUser)
        const city = await getCitiesByCityId(currentUser.userM?.cityId);
        console.log(`city`, city)
        setIso(city.country[0].iso.toLowerCase())
        setCountryName(city.country[0].country)
        setCity(city);
        loadWeather(city);
        
    }

    const loadWeather = async (city)=>{
        let id = 0;
        if(currentUser.userM?.cityId){
            id = city?.name;
        } else if (currentUser.userM?.countryId){
            id = city?.country[0].country;
        }else {
            return 0;
        }
        console.log(`id`, id)
        try {
            const weather = await getWeatherInfoById(id);
            console.log(`weather`, weather)
            setWeather(weather);
        } catch (error) {
            console.log(`error`, error)
        }
    }
    useEffect(()=>{
        loadCity();
    },[])
 return (
     <div className="d-flex justify-content-center mt-5">
        <Card className={classes.root} >
            <CardActionArea onClick={()=>{
                console.log(`cityname`, city.name)
                history.push(`/cityWeather/${city.city_id}/${city.name}`)
            }}>
            <CardMedia
                component="img"
                alt="Country Flag"
                height="192"
                image={`https://flagcdn.com/256x192/${iso}.png`}
                title={`Bandera de ${countryName}`}
            />
            <CardContent>

                <Typography gutterBottom variant="h4" component="h2">
                {city?.name}
                </Typography>
                <Typography  variant="h4" component="h4">
                Condition:
                </Typography>
                <Typography variant="h6" color="textSecondary" component="h5">
                    {weather?.current.condition.text} <img  src={`https:${weather?.current.condition.icon}`} />
                </Typography>
                <Typography variant="h5" component="h4">
                    Temperature:
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    {Math.round((weather?.current.temp_c),3)} °C / {Math.round((weather?.current.temp_f),3)} °F 
                </Typography>
                <Typography variant="h5" component="h4">
                    Feels like:
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    { Math.round((weather?.current.feelslike_c),3)} °C / { Math.round((weather?.current.feelslike_f),3)} °F 
                </Typography>
                <Typography variant="h5" component="h4">
                    Humidity:
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    {weather?.current.humidity} % 
                </Typography>
                <Typography variant="h5" component="h4">
                    Latitude:
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    {weather?.location.lat}°
                </Typography>
                <Typography variant="h5" component="h4">
                    Longitude:
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    {weather?.location.lon}°
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary">
                Detalles
            </Button>
            </CardActions>
        </Card>
     </div>
 )
}
export default Home