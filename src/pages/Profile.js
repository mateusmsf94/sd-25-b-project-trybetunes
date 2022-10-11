import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      isLoading: true,
    });
    const data = await getUser();
    this.setState({
      user: data,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, user } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {isLoading ? <Loading /> : (
            <div>
              <img data-testid="profile-image" src={ user.image } alt={ user.name } />
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
