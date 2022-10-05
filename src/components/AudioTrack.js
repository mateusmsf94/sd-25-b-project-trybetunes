import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class AudioTrack extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      isLoading: false,
    };
  }

  changeHandler = (event) => {
    const { track } = this.props;
    this.setState({
      isFavorite: event.target.checked,
      isLoading: true,
    }, () => this.addToFavorites(track));
  };

  addToFavorites = async (track) => {
    await addSong(track);
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
