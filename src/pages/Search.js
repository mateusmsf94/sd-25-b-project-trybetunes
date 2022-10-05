import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SearchForm from '../components/SearchForm';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      search: '',
      isDisable: true,
      albums: [],
      artist: '',
    };
  }

  changeHandler = (event) => {
    this.setState(
      {
        search: event.target.value,
      },
      this.buttonReady,
    );
  };

  buttonReady = () => {
    const MINCHAR = 2;
    const { search } = this.state;
    if (search.length >= MINCHAR) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  clickHandler = async (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    const { search } = this.state;
    const albums = await searchAlbumsAPI(search);
    this.setState({
      albums,
      artist: search,
      search: '',
      isLoading: false,
    });
  };

  render() {
    const { isDisable, search, artist, isLoading, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <SearchForm
            changeHandler={ this.changeHandler }
            inputValue={ search }
            isDisable={ isDisable }
            onClick={ this.clickHandler }
          />
        )}
        <section>
          {albums.length === 0 ? (
            <p>Nenhum álbum foi encontrado</p>
          ) : (
            <p>
              Resultado de álbuns de:
              {' '}
              {artist}
            </p>
          )}
          <div>
            {albums.map((album) => (
              <AlbumCard
                key={ album.collectionId }
                artistName={ album.artistName }
                artworkUrl100={ album.artworkUrl100 }
                collectionName={ album.collectionName }
                collectionId={ album.collectionId }
              />
            ))}

          </div>
        </section>
      </div>
    );
  }
}

export default Search;
