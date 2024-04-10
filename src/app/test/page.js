// pokeApiから全ポケモンの日本語名、statsを取得しstatsの高い順に並び替えて表示

'use client'
import { useEffect, useState } from "react";

export default function GetAllPokeStats() {
    const [allPokeStats, setAllPokeStats] = useState([]);
    useEffect(() => {
        fetchAllPokeStats();
    }, []);
    const fetchAllPokeStats = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=898`)
            .then((res) => res.json())
            .then((data) => {
                const promises = data.results.map((poke) => {
                    return fetch(poke.url).then((res) => res.json());
                });
                Promise.all(promises).then((pokemons) => {
                    const speciesPromises = pokemons.map(pokemon => {
                        return fetch(pokemon.species.url).then((res) => res.json());
                    });
                    Promise.all(speciesPromises).then((speciesData) => {
                        const sortedPokes = pokemons.map((pokemon, index) => {
                            const japaneseName = speciesData[index].names.find(name => name.language.name === 'ja-Hrkt').name;
                            return { ...pokemon, name: japaneseName };
                        }).sort((a, b) => {
                            return b.stats.reduce((acc, stat) => acc + stat.base_stat, 0) - a.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
                        });
                        setAllPokeStats(sortedPokes);
                    });
                });
            });

    }
    return (
        <div>
            {allPokeStats.map((poke) => (
                <div key={poke.id}>
                    <div>{poke.name}</div>
                    <div>{poke.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</div>
                </div>
            ))}
        </div>
    );
}