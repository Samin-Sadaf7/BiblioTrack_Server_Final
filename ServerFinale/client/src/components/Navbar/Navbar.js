import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bookheads from '../../images/books.jpg';
import useStyles from './styles';
const Navbar = () => {
      const classes = useStyles();
      const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const location = useLocation();
      useEffect(() => {
        const token = user?.token;
        console.log(user);
        if (token) {
          const decodedToken = jwtDecode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem("profile")));
      }, [location]);

      const logout = () => {
            dispatch({
                    type:'LOGOUT'
                });
            navigate('/auth');
            setUser(null);
      };
      return (
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Link to="/" className={classes.brandContainer}>        
                    <Typography className={classes.heading} variant="h2" align="center">BiblioTrack</Typography>
                    <img className={classes.image} src={bookheads} alt="icon" height="40px" />
                </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                <div className={classes.profile}>
                     <Button component={Link} to="/video" variant="contained" color="primary">Review Videos</Button>
                     <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
                ) : (
                 <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
            </AppBar>
        )
}

export default Navbar
