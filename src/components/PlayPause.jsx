import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (
  isPlaying && activeSong?.title === song.title ? ( // Si la canción que se toca = a la seleccionada 

  <FaPauseCircle                                    // aparecerá el símbolo de pausa
    size={35}
    className="text-gray-300"
    onClick={handlePause}
  />
) : (                                               // Si no es así se mostrará el ícono de play
  <FaPlayCircle
    size={35}
    className="text-gray-300"
    onClick={handlePlay}
  />
));

export default PlayPause;
