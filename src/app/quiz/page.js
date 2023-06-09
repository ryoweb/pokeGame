"use client"
import React, { useState, useEffect } from 'react';

export default function Quiz() {

    const [randomPoke, setRandomPoke] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // fetch ("https://pokeapi.co/api/v2/pokemon?limit=1118")
    // .then((res) => res.json())
    // .then((data) => {
    //     const random = Math.floor(Math.random() * data.results.length);
    //     fetch(data.results[random].url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setRandomPoke(data);
    //         setIsLoading(false);
    //     });
    // });
    // useEffect
    useEffect(() => {
        setIsLoading(true);
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
        .then((res) => res.json())
        .then((data) => {
            const random = Math.floor(Math.random() * data.results.length);
            fetch(data.results[random].url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setRandomPoke(data);
                setIsLoading(false);
            });
        });
    }, []);



    return(
        <>
            <div className="flex justify-center">
                {isLoading ? (
                    <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                ) : (
                    <div className="w-32 h-32">
                        {/* <img
                            className="w-full h-full"
                            src={randomPoke?.sprites.front_default}
                        /> */}
                        {/* シルエットクイズように黒く塗りつぶす */}
                        {/* <img
                            className="w-full h-full"
                            src={randomPoke?.sprites.other.official-artwork.front_default}
                        /> */}
                        <img
                            className="w-full h-full"
                            src={randomPoke?.sprites.other["official-artwork"].front_default}
                        />
                    </div>
                )}
            </div>
        </>
    );
}