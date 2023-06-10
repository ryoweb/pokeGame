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
                style={{
                    width: '200px',
                    height: '200px',
                }}
                src={randomPoke?.sprites.other['official-artwork'].front_default}
            />

            {/* このポケモンを削除する */}
            <div>
                <button
                    style={{
                        backgroundColor: '#ff0000',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        borderRadius: '4px',
                    }}
                    onClick={() => {
                        if (typeof localStorage !== 'undefined') {
                            const storedPokes = JSON.parse(localStorage.getItem('catchedPokes') || '[]');
                            const newTemotiPokes = storedPokes.filter((p) => randomPoke.id !== p.id);
                            localStorage.setItem('catchedPokes', JSON.stringify(newTemotiPokes));
                            window.location.href = '/temoti-pokes';
                        }
                    }}
                >
                    おくる
                </button>
            </div>

            {/* 戻るボタン */}
            <div>
                <button
                    style={{
                        backgroundColor: '#0000ff',
                    }}
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
