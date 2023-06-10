"use client"
import React, { useState, useEffect } from 'react';

export default function ShowTemoti() {
    const [randomPoke, setRandomPoke] = useState(null);
    const [pokeId, setPokeId] = useState(null);
    const [japaneseName, setJapaneseName] = useState(null);

    useEffect(() => {
        const path = window.location.pathname;
        const id = path.split('/show-temoti/')[1];
        setPokeId(id);
    }, []);

    useEffect(() => {
        if (pokeId) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setRandomPoke(data);
                });

            // 日本語名を取得する
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`)
                .then((res) => res.json())
                .then((speciesData) => {
                    const japaneseNameData = speciesData.names.find(name => name.language.name === 'ja');
                    if (japaneseNameData) {
                        setJapaneseName(japaneseNameData.name);
                    }
                });
        }
    }, [pokeId]);

    return (
        <div
            style={{
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            {japaneseName && <div>{japaneseName}</div>}
            <img
                className="w-32 h-32"
                src={randomPoke?.sprites.other['official-artwork'].front_default}
            />

            {/* このポケモンを削除する */}
            <div className="mt-4">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        const storedPokes = JSON.parse(localStorage.getItem('catchedPokes') || '[]');
                        const newTemotiPokes = storedPokes.filter((p) => randomPoke.id !== p.id);
                        localStorage.setItem('catchedPokes', JSON.stringify(newTemotiPokes));
                        window.location.href = '/temoti-pokes';
                    }}
                >
                    おくる
                </button>
            </div>

            {/* 戻るボタン */}
            <div className="mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    戻る
                </button>
            </div>
        </div>
    );
}
