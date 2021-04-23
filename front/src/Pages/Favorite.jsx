import React, {useEffect,useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import fire from '../config/fire';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { getWeatherInfoById } from '../services/weather';
import { getFavoriteByUserId } from '../services/favorite';
const useStyles = makeStyles({
    root: {
      minWidth: 400,
      maxWidth: 600,
      marginTop: 100,
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
    },
  });
const Favorite = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser,logOut } = useAuth();
    const [favoriteCities, setFavoriteCities] = useState([]);
    const  [iso, setIso] = useState('')
    const [countryName, setCountryName] = useState('')
    const [weather, setWeather] = useState();
    const loadCity = async()=>{
        const token = await fire.auth().currentUser.getIdToken();
        const favoriteCities = await getFavoriteByUserId(currentUser.uid,token);
        console.log(`favoriteCities`, favoriteCities)
        setFavoriteCities(favoriteCities)
    }
    useEffect(()=>{
        loadCity();
    },[])
 return (
     <>
        {
            favoriteCities.length > 0 ? (
                <>
                    {

                        favoriteCities.map((city,index)=>(
                        <div key={index} className="d-flex justify-content-center mt-5">
                            <Card className={classes.root} >
                                <CardActionArea onClick={()=>{
                                    console.log(`cityname`, city.city.name)
                                    history.push(`/cityWeather/${city.city.city_id}/${city.city.name}`)
                                }}>
                                <CardMedia
                                    component="img"
                                    alt="Country Flag"
                                    height="192"
                                    image={`https://flagcdn.com/256x192/${city.city.country[0].iso.toLowerCase()}.png`}
                                    title={`Bandera de ${countryName}`}
                                />
                                <CardContent>

                                    <Typography gutterBottom variant="h4" component="h2">
                                        {city.city.name}
                                    </Typography>
                                </CardContent>
                                </CardActionArea>
                                <CardActions>

                                </CardActions>
                            </Card>
                            </div>
                        ))
                    }
                </>
            ):(
                <h1>No tiene favoritos</h1>
            )
        }
     </>
 )
}
export default Favorite