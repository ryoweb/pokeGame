"use client"
import { useEffect, useState } from "react";

export default function GetRandomPoke() {
  const [randomPoke, setRandomPoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = () => {
    setIsLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
      .then((res) => res.json())
      .then((data) => {
        const random = Math.floor(Math.random() * data.results.length);
        fetch(data.results[random].url)
          .then((res) => res.json())
          .then((data) => {
            setRandomPoke(data);
            setIsLoading(false);
          });
      });
  };

  const handleCatch = () => {
    const catchedPokes = JSON.parse(localStorage.getItem("catchedPokes") || "[]");
    const random = Math.random();
    if (random < 0.7) {
      catchedPokes.push(randomPoke);
      localStorage.setItem("catchedPokes", JSON.stringify(catchedPokes));
      alert("つかまえた！〇");
    } else {
      alert("にげられた！×");
    }
    setIsLoading(true);
    fetchRandomPokemon();
  };

  return (
    <>
      <div className="flex justify-center">
        {isLoading ? (
          <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        ) : (
          <div className="w-32 h-32">
            <img
              className="w-full h-full"
              src={randomPoke?.sprites.other["official-artwork"].front_default}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {/* catche */}
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          onClick={handleCatch}
          style={{ fontSize: "40px" }}
        >
          つかまえる
        </button>

        {/* 別のポケモンを探す */}
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          onClick={fetchRandomPokemon}
          style={{ fontSize: "40px" }}
        >
          別のポケモンを探す
        </button>


        {/* temoti */}
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            location.href = "/temoti-pokes";
          }}
          style={{ fontSize: "40px" }}
        >
          てもちのポケモン
        </button>
      </div>
    </>
  );
}
