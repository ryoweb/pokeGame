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
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        // 背景画像を設定
                        background: "url(/battle.jpeg)",
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat",
                        height: "100vh",
                        width: "100vw",
                        position: "relative",
                    }}>
                        {/* 選出された相手ポケモンを表示 */}
                        <img src={randomPoke?.sprites}
                            style={{
                                height: "40%",
                                // heightと相対的にwidthを設定
                                width: "auto",
                                position: "absolute",
                                top: "40%",
                                right: "28%",
                                transform: "translate(50%, -50%)"
                            }} />
                        {/* <p
                            style={{
                                marginLeft: "40%",
                                fontSize: "3rem",
                            }}>強さ：{randomPoke?.power}</p> */}

                        <div>
                            {/* 選択されたポケモンを表示 */}
                            {myPoke && (
                                <div style={{ marginTop: "20px" }}>
                                    <img
                                        src={myPoke.backsprites || myPoke.sprites}
                                        alt="myPoke-back"
                                        style={{
                                            height: "40%",
                                            // heightと相対的にwidthを設定
                                            width: "auto",
                                            position: "absolute",
                                            top: "70%",
                                            left: "5%",
                                            transform: "translate(50%, -50%)"
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <button onClick={handleBattle} disabled={!myPoke}
                            style={{
                                fontSize: "2rem",
                                color: "yellow",
                                border: "2px solid yellow",
                                borderRadius: "10%",
                                // ふちを黒に
                                background: "black",
                                // 透明度を設定
                                opacity: "0.5",
                                // ホバー時の設定
                                ":hover": {
                                    background: "yellow",
                                    color: "black",
                                    opacity: "1",
                                }
                            }}>バトル</button>
                    </div>

                </>
            )
            }
            <div>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {JSON.parse(localStorage.getItem("catchedPokes") || "[]").map((poke, index) => (
                        <img
                            key={index}
                            src={poke.sprites}
                            alt={poke.name}
                            style={{
                                width: "70px", height: "70px", objectFit: "cover", cursor: "pointer",
                                // 選択された時のborder
                                border: myPoke?.id === poke.id ? "2px solid red" : "2px solid #ddd",
                                borderRadius: "10%",

                            }}
                            onClick={() => setMyPoke(poke)}
                            value={JSON.stringify(poke)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
