import React, {useEffect,useState, useRef} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../context/AuthContext';
import { useHistory, Link} from 'react-router-dom';
import Copyright from '../components/Copyright';
import { getCountries } from '../services/country';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, InputLabel } from '@material-ui/core';
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      // margin: theme.spacing(1),
      minWidth: "100%",
    },
  }));
const RegisterPage = (props) => {
    const history = useHistory()
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordConfir, setPasswordConfir] = useState('');
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState('');
    const [cities, setCities] = useState([]);
    const [cityId, setCityId] = useState('');
    const handleSubmit = async (event)=>{
      event.preventDefault();
      console.log(`password`, password)
      console.log(`passwordConfir`, passwordConfir)
      if(password !== passwordConfir){
        return setError("Las contraseñas no coinciden")
      }

      try {
        setError('');
        setLoading(true);
        await signUp({email, password, firstName, lastName, cityId, countryId})
        history.push('/home')
        
      } catch (error) {
        console.log(`error`, error)
          setError("No se pudo crear una nueva cuenta")
      } finally {
        setLoading(false);
      }

    }
    const handleChangeCountry = (event) => {
      setCountryId(event.target.value);
      const countrySelected = countries.find( country => country.country_id === event.target.value);
      console.log(`countrySelected`, countrySelected)
      const array_Temp = []
      countrySelected.cities.map((city)=>{
        array_Temp.push(city);
      })
      array_Temp.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      setCities(array_Temp);
    };
    const handleChangeCity = (event)=>{
      setCityId(event.target.value);
    }
    const loadCountry = async ()=>{
      try {
        const countries = await getCountries();
        console.log(`countries`, countries)
        setCountries(countries)
      } catch (error) {
        console.log(`error`, error)
      }
    }
    useEffect(()=>{
      loadCountry();
    },[])
    console.log(`cities`, cities)
   return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar} >
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        {
          error && (
            <Alert severity="error"> {error} </Alert>
          )
        }
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required={true}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange ={ ({target}) => setFirstName(target.value) }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange = {({target})=> setLastName(target.value)}
                />
            </Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="country_select">País de interes</InputLabel>
                <Select
                    autoWidth
                    labelId="country_select"
                    id="country"
                    value={countryId}
                    onChange={handleChangeCountry}
                    label="País de interes"
                  >
                  {
                    countries.length != 0 && countries.map((country)=>(
                      <MenuItem key={country.country_id} value={country.country_id}>{country.country}</MenuItem>
                    ))
                  }
                </Select>
                </FormControl>
            </Grid>

            {
              cities.length != 0 && (
                <Grid item xs={12}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="country_select">Ciudad de interes</InputLabel>
                      <Select
                          autoWidth
                          labelId="country_select"
                          id="country"
                          value={cityId}
                          onChange={handleChangeCity}
                          label="País de interes"
                        >
                        {
                          cities.length != 0 && cities.map((city)=>(
                            <MenuItem key={city.city_id} value={city.city_id}>{city.name}</MenuItem>
                          ))
                        }
                      </Select>
                      </FormControl>
                  </Grid>
              )
            }

            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={({target})=> setEmail(target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={({target})=> setPassword(target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirmed"
                label="Password confirmation"
                type="password"
                id="password"
                autoComplete="current-password"
                value={passwordConfir}
                onChange={({target})=> setPasswordConfir(target.value)}
                />
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
            Sign Up
            </Button>
            <Grid container justify="flex-end">
            <Grid item>
                <Link to="/login" variant="body2">
                Already have an account? Sign in
                </Link>
            </Grid>
            </Grid>
        </form>
        </div>
        <Box mt={5}>
        <Copyright />
        </Box>
    </Container>
 )
}
export default RegisterPage