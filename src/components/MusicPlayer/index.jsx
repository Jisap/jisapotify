import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player); // Estado del player
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true)); // si existe carga útil en currentSongs ponemos isPlaying en true y asi suena la canción
  }, [currentIndex]);

  const handlePlayPause = () => {     // Cuando damos a esta función...
    if (!isActive) return;            // Si la canción no esta activa no hacemos nada más

    if (isPlaying) {                  // Si la canción se esta tocando ponemos isPlaying en false -> se pausa la canción 
      dispatch(playPause(false));
    } else {                          // Sino lo contrario
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {      // Cuando damos a esta función
    dispatch(playPause(false));       // isPlaying en false -> Pausa

    if (!shuffle) {                                                         // Si shuffle = false
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));         // modificamos el estate para la canción siguiente según index+1
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      
      {/* Img con la cara del artista + nombre de la canción y el nombre del artista */}
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      
      {/* Controles del player */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        {/* Barra de desplazamiento del player */}
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        {/* Reproductor de música */}
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>

      {/* Barra de volumen */}
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    
    </div>
  );
};

export default MusicPlayer;
