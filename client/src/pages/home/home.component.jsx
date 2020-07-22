import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/current-user.context';
import Header from '../header/header.comopnent';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 200,
    margin: 'auto',
  },
}));

function HomePage({ history }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMovieClick = (event, index) => {
    history.push('/movie');
  };

  const [elevation, setElevation] = useState(2);

  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    try {
      // if user exist in local storage retrieve it
      const getUserFromLocalStorage = async () => {
        let user = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);

          //set current user in context
          setCurrentUser(user);
        } else {
          history.push('/login');
        }
      };
      getUserFromLocalStorage();
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const handleMouseOut = () => {
    setElevation(2);
  };

  const handleMouseOver = () => {
    setElevation(5);
  };
  return (
    <div className={classes.root}>
      <Header />
      <List component="nav" aria-label="secondary mailbox folder">
        <Paper onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} elevation={elevation}>
          <ListItem button onClick={(event) => handleMovieClick(event)}>
            <ListItemText primary="Movies" />
          </ListItem>
        </Paper>
      </List>
    </div>
  );
}

export default withRouter(HomePage);
