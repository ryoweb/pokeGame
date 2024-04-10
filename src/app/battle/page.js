"use client"
import React, { useState, useEffect } from "react";
import GetItemModal from "../../components/get-item-modal";
import LoseModal from "../../components/miss-modal";

export default function Battle() {
    const [randomPoke, setRandomPoke] = useState(null);
    const [myPoke, setMyPoke] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGetItemModalOpen, setIsGetItemModalOpen] = useState(false);
    const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);

    //モーダルを閉じる関数
    const handleCloseGetItemModal = () => {
        setIsGetItemModalOpen(false);
    }
    //ざんねんモーダルを閉じる関数
    const handleCloseLoseModal = () => {
        setIsLoseModalOpen(false);
    }

    useEffect(() => {
        fetchRandomPokemon();
    }, []);
    const fetchRandomPokemon = () => {
        setIsLoading(true);

        const randomId = Math.floor(Math.random() * 1010) + 1;

        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // 保存するデータを絞る
                const simplifiedPokemon = {
                    //図鑑番号
                    id: data.id,
                    //綺麗な画像
                    realsprites: data.sprites.other["official-artwork"].front_default,
                    //ゲーム内での画像
                    sprites: data.sprites["front_default"],
                    // バトル用の後ろ姿
                    backsprites: data.sprites["back_default"],
                    // 全ての種族値を足したもの
                    power: data.stats.reduce((acc, stat) => acc + stat.base_stat, 0),
                };
                setRandomPoke(simplifiedPokemon);
                setIsLoading(false);
            });
    };

    const handleSelect = (event) => {
        const selectedPoke = JSON.parse(event.target.value);
        setMyPoke(selectedPoke);
    };

    const handleBattle = () => {
        if (myPoke && randomPoke) {
            const myPower = myPoke.power;
            const randomPower = randomPoke.power;
            if (typeof localStorage !== 'undefined') {
                if (myPower > randomPower) {
                    //プレイヤ勝利時、プレイヤーにアイテムを付与する
                    setIsGetItemModalOpen(true);
                    setRandomPoke(null);
                    setMyPoke(null);
                    fetchRandomPokemon();

                } else if (myPower < randomPower) {
                    setIsLoseModalOpen(true);
                    setRandomPoke(null);
                    setMyPoke(null);
                    fetchRandomPokemon();
                } else {
                    setIsLoseModalOpen(true);
                    setRandomPoke(null);
                    setMyPoke(null);
                    fetchRandomPokemon();
                }
            }
        }
    };
    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* 正解時　アイテム取得モーダル */}
                    {isGetItemModalOpen && <GetItemModal onClose={handleCloseGetItemModal} />}
                    {/* 失敗時　ざんねんモーダル */}
                    {isLoseModalOpen && <LoseModal onClose={handleCloseLoseModal} />}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "url(/battle.jpg)", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", position: "relative" }}>
                        {/* 相手ポケモンを表示 */}
                        {randomPoke && <img src={randomPoke.sprites}
                            style={{
                                height: "40%",
                                width: "auto",
                                position: "absolute",
                                top: "20%",
                                right: "25%",
                                transform: "translate(50%, -50%)"
                            }} />}
                        <div>
                            {/* 選択された自身のポケモンを表示 */}
                            {myPoke && (
                                <div style={{ marginTop: "20px" }}>
                                    <img
                                        src={myPoke.backsprites || myPoke.sprites}
                                        alt="myPoke-back"
                                        style={{ height: "40%", width: "auto", position: "absolute", top: "40%", left: "-5%", transform: "translate(50%, -50%)" }}
                                    />
                                </div>
                            )}
                        </div>
                        {/* バトル開始ボタン */}
                        <button onClick={handleBattle} disabled={!myPoke}
                            style={{
                                fontSize: "2rem",
                                color: "yellow",
                                border: "2px solid yellow",
                                borderRadius: "10%",
                                background: "black",
                                opacity: "0.5",
                                ":hover": {
                                    background: "yellow",
                                    color: "black",
                                    opacity: "1",
                                }
                            }}>ばとる</button>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                        {typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem("catchedPokes") || "[]").map((poke, index) => (
                            <img
                                key={index}
                                src={poke.sprites}
                                alt={poke.name}
                                style={{
                                    width: "70px", height: "70px", objectFit: "cover", cursor: "pointer",
                                    border: myPoke?.id === poke.id ? "2px solid red" : "2px solid #ddd",
                                    borderRadius: "10%",
                                }}
                                onClick={() => setMyPoke(poke)}
                                value={JSON.stringify(poke)}
                            />
                        ))}
                    </div>
                </>)
            }
        </>
    );
}