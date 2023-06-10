"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
export default function TemotiPokes() {
    const [temotiPokes, setTemotiPokes] = useState([]);

    useEffect(() => {
        const storedPokes = JSON.parse(localStorage.getItem('catchedPokes') || '[]');
        setTemotiPokes(storedPokes);
    }, []);

    return (
        <>
            {/* border */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {temotiPokes.map((poke) => (
                    <div key={poke?.id} style={{ width: '50px', height: '50px', margin: '30px' }}>
                        {/* ポケモンの画像 */}
                        <Link href={`/show-temoti/${poke.id}`}>
                            <img src={poke?.sprites} alt={poke?.name}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '10%'
                                }}
                            />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-20">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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



// 予備のコンポーネント

{/* にがす */ }
// <div>
//     <button
//         onClick={() => {
//             const newTemotiPokes = temotiPokes.filter((p) => poke.id !== p.id);
//             setTemotiPokes(newTemotiPokes);
//             localStorage.setItem('catchedPokes', JSON.stringify(newTemotiPokes));
//         }}
//     >
//         にがす
//     </button>
// </div>

{/* つかまえにいく */ }
{/* <a href="/get-random-poke">つかまえにいく</a> */ }