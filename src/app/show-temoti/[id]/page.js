"use client"
import React, { useState, useEffect } from 'react';

export default function ShowTemoti() {
    const [randomPoke, setRandomPoke] = useState(null);
    const [pokeId, setPokeId] = useState(null);
    const [japaneseName, setJapaneseName] = useState(null);
    const [japaneseFlavorText, setJapaneseFlavorText] = useState(null);
    const [genera, setGenera] = useState(null);

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
                    // console.log(data);
                    setRandomPoke(data);
                });

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`)
                .then((res) => res.json())
                .then((speciesData) => {
                    console.log(speciesData);
                    // 日本語名を取得する
                    const japaneseNameData = speciesData.names.find(name => name.language.name === 'ja');
                    if (japaneseNameData) {
                        setJapaneseName(japaneseNameData.name);
                    }
                    // 日本語の解説を取得する
                    const japaneseFlavorTextData = speciesData.flavor_text_entries.find(entry => entry.language.name === 'ja');
                    if (japaneseFlavorTextData) {
                        setJapaneseFlavorText(japaneseFlavorTextData.flavor_text);
                    }
                    //genera(分類)を取得する
                    const genera = speciesData.genera.find(genera => genera.language.name === 'ja');
                    if (genera) {
                        setGenera(genera.genus);
                    }
                });
        }
    }, [pokeId]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            {/* 名前 */}
            {japaneseName && <div className='poke-name'>{japaneseName}</div>}
            {/* 分類 */}
            <div className="poke-genera">
                <p>{genera}</p>
            </div>
            {/* 画像 */}
            <img
                style={{ width: '200px', height: '200px', }}
                src={randomPoke?.sprites.other['official-artwork'].front_default}
            />

            {/* 解説 */}
            <div className="poke-info">
                <p>{japaneseFlavorText}</p>
            </div>


            <div className='play-button'>
                <button
                    onClick={() => {
                        const pokeName = document.querySelector('.poke-name').textContent;
                        const pokeGenera = document.querySelector('.poke-genera').textContent;
                        const pokeInfo = document.querySelector('.poke-info').textContent;

                        const utterance1 = new SpeechSynthesisUtterance(pokeName);
                        window.speechSynthesis.speak(utterance1);

                        setTimeout(() => {
                            const utterance2 = new SpeechSynthesisUtterance(pokeGenera);
                            window.speechSynthesis.speak(utterance2);
                        }, 1200); // 1.2秒待機

                        setTimeout(() => {
                            const utterance3 = new SpeechSynthesisUtterance(pokeInfo);
                            window.speechSynthesis.speak(utterance3);
                        }, 2400); // 2.4秒待機
                    }}
                    style={{
                        border: '1px solid black',
                        borderRadius: '5px',
                        margin: '10px',
                    }}
                >
                    せつめい
                </button>
            </div>

            {/* 戻るボタン */}
            <div>
                <button
                    onClick={() => {
                        window.history.back();
                    }}
                    style={{
                        border: '1px solid black',
                        borderRadius: '5px',
                        margin: '10px',
                    }}
                >
                    もどる
                </button>
            </div>

            {/* このポケモンを削除する */}
            <div>
    <button
        onClick={() => {
            if (typeof localStorage !== 'undefined') {
                const storedPokes = JSON.parse(localStorage.getItem('catchedPokes') || '[]');
                const index = storedPokes.findIndex((p) => randomPoke.id === p.id);
                if (index !== -1) {
                    storedPokes.splice(index, 1);
                }
                localStorage.setItem('catchedPokes', JSON.stringify(storedPokes));
                window.location.href = '/temoti-pokes';
            }
        }}
        style={{
            border: '1px solid black',
            borderRadius: '5px',
            margin: '10px',
        }}
    >
        はかせにおくる
    </button>
</div>
        </div>
    );
}