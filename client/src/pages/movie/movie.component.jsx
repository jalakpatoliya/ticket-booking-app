import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../header/header.comopnent';
import MovieList from '../../components/movie-list/movie-list.component';
import { CurrentUserContext } from '../../contexts/current-user.context';

const Movie = ({ history }) => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  //check if token exists in local storage
  useEffect(() => {
    try {
      //get token from local storage
      const getUserFromLocalStorage = async () => {
        let user = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          //set current user in context
          await setCurrentUser({ email: user.email, token: user.token });
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
      <MovieList />
    </div>
  );
};

export default withRouter(Movie);
