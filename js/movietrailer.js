import React from 'react';
import YouTube from 'react-youtube';

const MovieTrailer = ({ videoId }) => {
  const opts = {
    height: '315',
    width: '560',
    playerVars: {
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
}

export default MovieTrailer;

