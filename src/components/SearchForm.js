import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  render() {
    const { changeHandler, inputValue, isDisable, onClick } = this.props;
    return (
      <form>
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Nome do Artista"
          onChange={ changeHandler }
          value={ inputValue }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isDisable }
          onClick={ onClick }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  isDisable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchForm;
