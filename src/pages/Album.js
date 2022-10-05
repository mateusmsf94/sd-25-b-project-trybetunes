import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AudioTrack from '../components/AudioTrack';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      data: [],
    };
  }

  componentDidMount() {
    this.fetchAlbum();
  }

  fetchAlbum = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await getMusics(id);
    const { artistName, collectionName } = data[0];
    this.setState({
      artistName,
      collectionName,
      data,
    });
  };

  render() {
    const { artistName, collectionName, data } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        {data.slice(1).map((track) => (
          <AudioTrack
            key={ track.trackId }
            track={ track }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
