"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
export default function TemotiPokes() {
    const [temotiPokes, setTemotiPokes] = useState([]);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const storedPokes = JSON.parse(localStorage.getItem('catchedPokes') || '[]');
            setTemotiPokes(storedPokes);
        }
    }, []);

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {temotiPokes.map((poke) => (
                    <div key={poke?.id} style={{ width: '150px', height: '150px', margin: '10px' }}>
                        {/* ポケモンの画像 */}
                        <Link href={`/show-temoti/${poke.id}`}>
                            <img src={poke?.sprites} alt={poke?.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "1px solid #ddd",
                                    borderRadius: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            />
                        </Link>
                    </div>
                ))}
            </div>

            <div>
                <button onClick={() => { window.history.back(); }}>戻る</button>
            </div>
        </>
    );
}