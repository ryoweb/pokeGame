"use client"
import React, { useState, useEffect } from 'react';

export default function TemotiPokes() {
    const [temotiPokes, setTemotiPokes] = useState([]);

    useEffect(() => {
        const storedPokes = JSON.parse(localStorage.getItem('catchedPokes') || '[]');
        setTemotiPokes(storedPokes);
    }, []);

    return (
        <>
            <h1>てもちのポケモン</h1>
            <div>
                {temotiPokes.map((poke) => (
                    <div key={poke.id}>
                        {/* <img src={poke.sprites.front_default} /> */}
                        {/* 画質を上げる番 */}
                        <img src={poke.sprites.other["official-artwork"].front_default} />
                        <p>{poke.name}</p>
                        {/* にがすボタン */}
                        <button
                            onClick={() => {
                                const newTemotiPokes = temotiPokes.filter((p) => p.id !== poke.id);
                                setTemotiPokes(newTemotiPokes);
                                localStorage.setItem('catchedPokes', JSON.stringify(newTemotiPokes));
                            }}
                        >
                            にがす
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};