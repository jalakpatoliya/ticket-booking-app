import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/home/home.component';
import SignUp from './components/sign-up/sign-up.component';
import SignIn from './components/sign-in/sign-in.component';
import Movie from './pages/movie/movie.component';

import { CurrentUserProvider } from './contexts/current-user.context';
import { SelectedDataProvider } from './contexts/selected-data.context';

const App = () => {
  return (
    <div className="App">
      <CurrentUserProvider>
        <SelectedDataProvider>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/movie" component={Movie} />
          </Switch>
        </SelectedDataProvider>
      </CurrentUserProvider>
    </div>
  );
};

export default App;
