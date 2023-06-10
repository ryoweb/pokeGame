"use client"
import React, { useState, useEffect } from 'react';

export default function TemotiPokes() {
    const [temotiPokes, setTemotiPokes] = useState([]);

    useEffect(() => {
        const storedPokes = JSON.parse(localStorage.getItem('catchedPokes') || '[]');
        setTemotiPokes(storedPokes);
    }, []);

    const handlePokemonClick = (pokemon) => {
        // 詳細画面に遷移する処理を実装する
        console.log('Clicked:', pokemon);
    };

    return (
        <>
            <h1>てもちのポケモン</h1>
            {temotiPokes.map((poke) => (
                <div key={poke?.id} onClick={() => handlePokemonClick(poke)}>
                    {/* 画像
                    <img src={poke?.sprites?.front_default} alt={poke?.name} /> */}
                    {/* 横向きに並べる、折り返す */}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ width: '50px', height: '50px', margin: '5px' }}>
                            <img src={poke?.sprites?.front_default} alt={poke?.name} />
                        </div>
                    </div>
                    {/* end */}
                </div>
            ))}
        </>
    );
}

{/* にがすボタン */ }
{/* < button
onClick={() => {
const newTemotiPokes = temotiPokes.filter((p) => p.id !== poke.id);
setTemotiPokes(newTemotiPokes);
localStorage.setItem('catchedPokes', JSON.stringify(newTemotiPokes));
}}
>
にがす
</button> */}