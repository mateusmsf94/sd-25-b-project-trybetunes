import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class AudioTrack extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = async () => {
    const { track } = this.props;
    this.setState({
      isLoading: true,
    });
    const data = await getFavoriteSongs();
    this.setState({
      isFavorite: data.some((favTrack) => favTrack.trackId === track.trackId),
      isLoading: false,
    });
  };

  changeHandler = (event) => {
    const { track } = this.props;
    const { isFavorite } = this.state;
    this.setState({
      isFavorite: event.target.checked,
      isLoading: true,
    }, () => (!isFavorite
      ? this.addToFavorites(track)
      : this.removeFromFavorites(track)));
  };

  addToFavorites = async (track) => {
    await addSong(track);
    this.setState({
      isLoading: false,
    });
  };

  removeFromFavorites = async (track) => {
    await removeSong(track);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { track: { previewUrl, trackName, trackId } } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            id={ trackId }
            type="checkbox"
            onChange={ this.changeHandler }
            checked={ isFavorite }
          />
        </label>
        {isLoading && <Loading />}
      </div>
    );
  }
}

AudioTrack.propTypes = {
  track: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default AudioTrack;
