import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchName();
  }

  fetchName = async () => {
    const name = await getUser();
    this.setState({
      userName: name,
      loading: false,
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        {loading
          ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{userName.name}</p>}
      </header>
    );
  }
}

export default Header;
