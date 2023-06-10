"use client";
import { useEffect, useState } from "react";
import MonsterBall from "../../components/monsterball";

export default function GetRandomPoke() {
    const [randomPoke, setRandomPoke] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quizChoices, setQuizChoices] = useState([]);

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    const fetchRandomPokemon = async () => {
        setIsLoading(true);

        const randomId = Math.floor(Math.random() * 1010) + 1;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();

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

        await fetchRandomPokemonForChoices(simplifiedPokemon);

        setIsLoading(false);
    };

    const fetchRandomPokemonForChoices = async (randomPoke) => {
        const randomIds = Array.from({ length: 4 }, () => Math.floor(Math.random() * 1010) + 1);

        const responseList = await Promise.all(
            randomIds.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
        );

        const dataList = await Promise.all(responseList.map((res) => res.json()));

        const choices = dataList.map((data) => ({
            id: data.id,
            realsprites: data.sprites.other["official-artwork"].front_default,
        }));

        choices.push({ id: randomPoke.id, realsprites: randomPoke.realsprites });

        setQuizChoices(choices.sort(() => Math.random() - 0.5));
    };

    const handleAnswer = (selectedPokemon) => {
        if (selectedPokemon.id === randomPoke.id) {
            alert("せいかい！");
            const catchedPokes = JSON.parse(localStorage.getItem("catchedPokes") || "[]");
            catchedPokes.push(randomPoke);
            localStorage.setItem("catchedPokes", JSON.stringify(catchedPokes));
        } else {
            alert("おしい！");
        }

        fetchRandomPokemon();
    };

    return (
        <>
            {isLoading ? (
                <>
                    クイズのじゅんびちゅう...
                    <MonsterBall />
                </>
            ) : (
                <>
                    <div style={{ filter: "brightness(0%)" }}>
                        <img
                            style={{
                                width: "300px",
                                height: "300px",
                                display: "block",
                                margin: "0 auto",
                            }}
                            src={randomPoke?.realsprites}
                            alt="ランダムなポケモン"
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {quizChoices.map((choice) => (
                            <div key={choice.id} onClick={() => handleAnswer(choice)}>
                                <img
                                    style={{
                                        width: "100%",
                                        border: "solid 1px black",
                                        margin: "5%",
                                        borderRadius: "10px",
                                    }}
                                    src={choice.realsprites}
                                    alt="選択肢のポケモン"
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}