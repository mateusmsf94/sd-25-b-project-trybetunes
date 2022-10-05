import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/favorites"><Favorites /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route path="/profile/edit"><ProfileEdit /></Route>
        <Route path="*"><NotFound /></Route>

      </Switch>
    );
  }
}

export default App;
