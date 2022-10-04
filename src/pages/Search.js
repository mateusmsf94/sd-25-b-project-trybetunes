import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      isDisable: true,
    };
  }

  changeHandler = (event) => {
    this.setState({
      artistName: event.target.value,
    }, this.buttonReady);
  };

  buttonReady = () => {
    const MINCHAR = 2;
    const { artistName } = this.state;
    if (artistName.length >= MINCHAR) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  render() {
    const { isDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            onChange={ this.changeHandler }
          />
          <button type="submit" data-testid="search-artist-button" disabled={ isDisable }>
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
