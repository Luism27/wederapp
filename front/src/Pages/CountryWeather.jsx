import { Box, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, makeStyles, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React, {useEffect,useState} from 'react'
import { getCountryById } from '../services/country';
import { useAuth } from '../context/AuthContext'
import { getCitiesByCityId, getCitiesByCityName } from '../services/city';
import { getForecastByName, getHistoryByName } from '../services/weather';
import PropTypes from 'prop-types';
import moment from 'moment'
import { useHistory } from 'react-router';
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button';
import { PhotoCamera, Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import { getFavoriteByCityAndUserId, addFavoriteCity, deleteFavoriteCity } from '../services/favorite';
import fire from '../config/fire'
const useStyles = makeStyles((theme)=>({
    root: {
      minWidth: 400,
      maxWidth: 600,
      marginTop: 100,
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
    },
    root2:{
        flexGrow:1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
  }));
const CountryWeather = (props) => {
    const yesterday =moment(moment().subtract(1,'d'));
    const minDate = moment(moment().subtract(7,'d'));
    const classes = useStyles();
    const history = useHistory();
    const cityName = props.match.params.name;
    const cityId = props.match.params.id;
    const { currentUser } = useAuth();
    const [city, setCity] = useState();
    const  [iso, setIso] = useState('')
    const [country, setCountry] = useState();
    const [value, setValue] = useState("one");
    const [forecast, setForecast] = useState();
    const [selectedDate, setSelectedDate] = useState(yesterday)
    const [foreHist, setForeHist] = useState()
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [token, setToken] = useState();
    const [loadingFavorite, setLoadingFavorite] = useState(false)
    const handleSearch = async()=>{
        try {
            setLoading(true)
            await loadHistory();
        } catch (error) {
            console.log(`error`, error)
        } finally {
            setLoading(false);
        }
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const loadCountry = async (id)=>{
        try {
            const country = await getCountryById(id);
            setCountry(country);
        } catch (error) {
            console.log(`error`, error)
        }
    }
    const loadCity = async()=>{
        const tok = await loadToken();
        const city = await getCitiesByCityId(cityId);
        if(city.name != cityName){
            history.push('/cityNotFound');
        }
        setCity(city);
        setIso(city?.country[0].iso.toLowerCase())
        await loadCountry(city?.country[0].country_id);
        console.log(`token`, token)
        await loadFavoriteCity(tok);     
    }
    const loadForeCastWeather = async ()=>{
        const forecast = await getForecastByName(cityName);
        setForecast(forecast)
    }
    const loadHistory = async () => {
        const historyF = await getHistoryByName({
            date: selectedDate.format('YYYY-MM-DD'),
            name: cityName,
        })
        setForeHist(historyF)
    }
    const loadFavoriteCity = async (tokenn)=>{
        const favorite = await getFavoriteByCityAndUserId({
            cityId: cityId,
            userId: currentUser?.uid,
        },tokenn);
        console.log(`favorite`, favorite)
        favorite ? setIsFavorite(true):setIsFavorite(false)
    }

    const addFavorite = async ()=>{
        try {
            setLoadingFavorite(true)
            const model ={
                city: city,
                city_id: city.city_id,
                uuid: currentUser.uid
            }
            await addFavoriteCity(model,token);
            loadFavoriteCity(token);
            
        } catch (error) {
            console.log(`error`, error)
        } finally {
            setLoadingFavorite(false)
        }
    }
    const deleteFavorite = async ()=>{
        try {
            setLoadingFavorite(true)
            await deleteFavoriteCity({
                cityId: city.city_id,
                userId: currentUser.uid
            },token)
            loadFavoriteCity(token);
        } catch (error) {
            console.log(`error`, error)
        } finally {
            setLoadingFavorite(false)
        }

    }
    const loadToken = async()=>{
        const token = await fire.auth().currentUser.getIdToken();
        setToken(token);
        return token;
    }
    useEffect(()=>{
        loadCity();
        loadForeCastWeather();
        loadHistory();
    },[])

    //tab
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography component={'div'}>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `wrapped-tab-${index}`,
          'aria-controls': `wrapped-tabpanel-${index}`,
        };
      }
 return (
    <div>
     {
         city ? (
             <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
             <Paper square>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab value="one"
                        label="City Information"
                        wrapped
                        {...a11yProps('one')} />
                    <Tab value="two" label="Forecast" {...a11yProps('two')}/>
                    <Tab value="three" label="History" {...a11yProps('three')}  />
                </Tabs>
            </Paper>
            <TabPanel value={value} index="one">
                <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={`https://flagcdn.com/256x192/${iso}.png`} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                País
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {country?.country}
                            </Typography> <br/>
                            <Typography gutterBottom variant="subtitle1">
                                Ciudad
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {city?.name}
                            </Typography> <br/>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                            Remover de favoritos
                            </Typography>
                        </Grid>
                        </Grid>
                        <Grid item>
                        <IconButton disabled={loadingFavorite} color="inherit" aria-label="upload picture" component="span" onClick={()=>{
                            console.log("Add to favorite")
                            console.log(`isFavorite`, isFavorite)
                            if(isFavorite){
                                deleteFavorite();
                            } else {
                                addFavorite();
                            }
                        }}>
                            {
                                isFavorite ? <Favorite  />:<FavoriteBorderOutlined />
                            }
                                           
                        </IconButton>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
                </div>
            </TabPanel>
            <TabPanel value={value} index="two">
                {
                    forecast &&  forecast.forecast.forecastday.map((fore,index)=>(                        
                    <div key={index}  className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={`https:${fore.day.condition.icon}`} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>

                                <Typography gutterBottom variant="subtitle1">
                                    Ciudad
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {city?.name}
                                </Typography> <br/>

                                <Typography gutterBottom variant="subtitle1">
                                    date
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {moment(fore.date).format('ll')}
                                </Typography> <br/>

                                <Typography gutterBottom variant="subtitle1">
                                    condition
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {fore.day.condition.text}
                                </Typography> <br/>

                                <Typography gutterBottom variant="subtitle1">
                                    Average temperature
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {Math.round((fore.day.avgtemp_c),3)} °C / {Math.round((fore.day.avgtemp_f),3)} °F
                                </Typography> <br/>

                                <Typography gutterBottom variant="subtitle1">
                                    Average Humidity
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {Math.round((fore.day.avghumidity),3)} °% 
                                </Typography> <br/>

                            </Grid>

                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    </div>
                    ))
                }
            </TabPanel>
            <TabPanel value={value} index="three">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="YYYY/MM/DD"
                        value={selectedDate}
                        maxDate={yesterday}
                        minDate={minDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                    onClick={handleSearch}
                    >
                        Search
                </Button>
                {                       
                    <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={`https:${foreHist?.forecast.forecastday[0].day?.condition.icon}`} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>

                                <Typography gutterBottom variant="subtitle1">
                                    Ciudad
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {city?.name}
                                </Typography> <br/>

                                <Typography gutterBottom variant="subtitle1">
                                    date
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {moment(foreHist?.forecast.forecastday[0].date).format('ll')}
                                </Typography> <br/>

                                <Typography gutterBottom variant="subtitle1">
                                    condition
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {foreHist?.forecast.forecastday[0].day?.condition.text}
                                </Typography> <br/>

                                <Typography gutterBottom variant="subtitle1">
                                    Average temperature
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {Math.round((foreHist?.forecast.forecastday[0].day?.avgtemp_c),3)} °C / {Math.round((foreHist?.forecast.forecastday[0].day?.avgtemp_f),3)} °F
                                </Typography> <br/>

                                <Typography gutterBottom variant="subtitle1">
                                    Average Humidity
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {Math.round((foreHist?.forecast.forecastday[0].day?.avghumidity),3)} °% 
                                </Typography> <br/>

                            </Grid>

                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    </div>
                }
            </TabPanel>

            </div>
         ):(
             <div className="d-flex justify-content-center mt-5">
                <h1>Ciudad no Encontrada</h1>
             </div>
         )
     }
    </div>
 )
}
export default CountryWeather