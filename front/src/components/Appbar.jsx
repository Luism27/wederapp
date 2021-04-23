import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Button, Slide } from '@material-ui/core';
import { useStyles } from '../custom/style'
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router';
import logo from '../assets/images/logo.png'
import { getCities } from '../services/city';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Appbar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [cities, setCities] = useState();
    const { currentUser, logOut } = useAuth(); 
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const history = useHistory()
    const loadCities = async (word)=>{
      console.log("Cargar ciudades")
      try {
        if(word.length > 0 ){
          const cities = await getCities(word);
          console.log(`cities`, cities)
          setCities(cities)
        } else {
          setCities();
        }
      } catch (error) {
        console.log(`error`, error)
      }
    }
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={async ()=>{
          try {
              await logOut();
              handleMenuClose();
              history.push("/login")
          } catch (error) {
              console.log(`error`, error)
          }
        }}>Cerrar sesión</MenuItem>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    const handleClickAway = ()=>{
      setCities();
    }
    const onClickCity = (cityId,cityName)=>{
      window.location.href = `/cityWeather/${cityId}/${cityName}`
    }
    useEffect(() => {
    }, [])
  return (
    <div className={classes.grow}>
    <HideOnScroll {...props}>
      <AppBar color="inherit">
        <Toolbar>
          <Button color="primary" onClick={()=> history.push('/')}>
            <Typography className={classes.title} variant="h6" noWrap>
              <img src={logo} className="rounded"  alt="logo" width={200 } height={50 }/>
              {/* weather App */}
            </Typography>
          </Button>
          {
            currentUser && (
              <>
                <ClickAwayListener
                  mouseEvent="onMouseDown"
                  touchEvent="onTouchStart"
                  onClickAway={handleClickAway}
                >
                  
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    onChange={(event)=>{
                      loadCities(event.target.value);
                    }}
                      classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  {
                    cities && (
                    <div className={classes.dropdown}>
                      {
                        cities.map((city)=>(
                          <Button
                          key={city.city_id}
                          fullWidth
                          onClick={()=> onClickCity(city.city_id,city.name)}
                          >
                            {city.name} - {city.country[0].country}
                          </Button>
                        ))
                      }
                    </div>
                    )
                  }
                </div>
                </ClickAwayListener>
              </>
            )
          }
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {
            !currentUser && (
              <>
                <Button color="primary" onClick={()=> history.push('/login')}>
                  Iniciar Sesión
                </Button>
                <Button color="primary" onClick={()=> history.push('/register')}>
                  Registarse
                </Button>
              </>
            )
          }
            {
              currentUser && (
                <>
                  <Button color="primary" onClick={()=> history.push('/home')}>
                      Home
                    </Button>
                    <Button color="primary" onClick={()=> history.push('/favorite')}>
                      Favoritos
                  </Button>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </>
              )
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}