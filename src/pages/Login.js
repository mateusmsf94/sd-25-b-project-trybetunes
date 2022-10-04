import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';
import Logo from '../assets/logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      isDisable: true,
      isLoading: false,
    };
  }

  inputHandle = (event) => {
    this.setState({
      nameInput: event.target.value,
    }, this.buttonReady);
  };

  buttonReady = () => {
    const MINCHAR = 3;
    const { nameInput } = this.state;
    if (nameInput.length >= MINCHAR) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  clickHandle = async (event) => {
    event.preventDefault();
    const { nameInput } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: nameInput });
    history.push('/search');
  };

  render() {
    const { nameInput, isDisable, isLoading } = this.state;
    return (
      <div className="container-login">
        <div data-testid="page-login" className="login-box">
          <form>
            <img src={ Logo } alt="logo" />
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.inputHandle }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isDisable }
              value={ nameInput }
              onClick={ this.clickHandle }
            >
              Entrar
            </button>
            {isLoading && <p>Carregando...</p>}
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
