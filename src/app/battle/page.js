"use client"
import React, { useState, useEffect } from "react";

export default function Battle() {
    const [randomPoke, setRandomPoke] = useState(null);
    const [myPoke, setMyPoke] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
                    const catchedPokes = JSON.parse(localStorage.getItem("catchedPokes") || "[]");
                    catchedPokes.push(randomPoke);
                    localStorage.setItem("catchedPokes", JSON.stringify(catchedPokes));
                    alert("かった！かつとポケモンはゲットできるよ！");

                    setRandomPoke(null);
                    setMyPoke(null);
                    fetchRandomPokemon();

                } else if (myPower < randomPower) {
                    alert("まけた！ざんねん！");
                    setRandomPoke(null);
                    setMyPoke(null);
                    fetchRandomPokemon();
                } else {
                    alert("あいこ");
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
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "url(/battle.jpg)", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", position: "relative" }}>
                        {/* 相手ポケモンを表示 */}
                        <img src={randomPoke?.sprites}
                            style={{
                                height: "40%",
                                width: "auto",
                                position: "absolute",
                                top: "20%",
                                right: "25%",
                                transform: "translate(50%, -50%)"
                            }} />
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
                    </div>
                </>)}
        </>
    );
}