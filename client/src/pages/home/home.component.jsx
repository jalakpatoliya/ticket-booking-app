import React, { useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/current-user.context';
import axios from 'axios';
import Header from '../header/header.comopnent';
import Movie from '../movie/movie.component';

const HomePage = ({ history }) => {
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

          //
        } else {
          history.push('/login');
        }
      };
      getUserFromLocalStorage();
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <div>
      <Header />
      <Link to="/movie">Movie</Link>
    </div>
  );
};

export default withRouter(HomePage);
