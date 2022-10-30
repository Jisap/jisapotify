import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';
//import { useGetTopChartsQuery } from '../redux/services/shazamCore';



const Discover = () => {

    const dispatch = useDispatch();
    const { genreListId } = useSelector((state) => state.player);           // Valor del género musical escogido para mostrar
    const { activeSong, isPlaying } = useSelector((state) => state.player); // Canción seleccionada y la que se esta tocando
    //const { data, isFetching, error } = useGetTopChartsQuery();           // Fetch a la api
    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

    if (isFetching) return <Loader title="Loading songs..." />;

    if (error) return <Error />;

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title; // Se muestra el título que coincida con el estado

    return (
        <div className=" flex flex-col">

            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
                <select
                    onChange = {(e) => dispatch(selectGenreListId(e.target.value))}//Click da valor y estado a genreListId
                    value={ genreListId || 'pop' }
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                     { genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>) }
                </select>
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard 
                        key={ song.key }
                        song={ song }
                        isPlaying={ isPlaying }      // A todas las canciones de la data se le pasan
                        activeSong={ activeSong }    // las props isPlaying y activeSong que posteriormente
                        data={ data }                // En SongCard se les dara valor
                        i={i} 
                    />
                ))}
            </div>

        </div>
    )

}
export default Discover;