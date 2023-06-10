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

    // idでの並び替えボタンの作成
    const sortById = () => {
        const sortedPokes = [...temotiPokes].sort((a, b) => {
            return a.id - b.id;
        });
        setTemotiPokes(sortedPokes);
    };

    // 入手順に並び替えるボタンの作成
    const sortByGetOrder = () => {
        const sortedPokes = [...temotiPokes].sort((a, b) => {
            return a.getOrder - b.getOrder;
        });
        setTemotiPokes(sortedPokes);
    };



    return (
        <>
            <div>
                {/* 並び替える */}
                <button onClick={sortById}>ずかん番号で並び替え</button>
            </div>

            {/* border */}
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
                <button
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    戻る
                </button>
            </div>
        </>
    );
}