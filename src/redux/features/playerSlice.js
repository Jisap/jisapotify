import { createSlice } from '@reduxjs/toolkit';

const initialState = {  // Estado inicial
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,// Canción que se le dio play
  activeSong: {},  // Canción seleccionada 
  genreListId: '', // Viene dado por la elección del usuario en el select de discover page
};

const playerSlice = createSlice({ // Agregador de reducers -> modifican el estado inicial
  name: 'player',
  initialState,
  reducers: {

    setActiveSong: (state, action) => {                         // Recibe el activeSong state y su modificación en el action
      state.activeSong = action.payload.song;                   // Se establece el nuevo state de activeSong

      if (action.payload?.data?.tracks?.hits) {                 // Si hay carga útil en el action.payload se establece el nuevo estado
        state.currentSongs = action.payload.data.tracks.hits;   // en currentSongs
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {  // Se recibe el índice de la siguiente canción

      if (state.currentSongs[action.payload]?.track) {                  // Si existe esa canción
        state.activeSong = state.currentSongs[action.payload]?.track;   // la establecemos como activa
      } else {
        state.activeSong = state.currentSongs[action.payload];          // Sino se deja como estaba
      }

      state.currentIndex = action.payload;                              // Actualizamos el estado del índice recibido
      state.isActive = true;                                            // y ponemos la canción con isActive = true
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {       // Recibe un false para aplicarlo al isPlaying y asi hacer la pausa de la canción
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => { // Modifica el estado de genreListId con el valor del select de géneros musicales
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
