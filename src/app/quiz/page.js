"use client";
import { useEffect, useState } from "react";

export default function GetRandomPoke() {
    const [randomPoke, setRandomPoke] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quizChoices, setQuizChoices] = useState([]);

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    const fetchRandomPokemon = () => {
        setIsLoading(true);

        const randomId = Math.floor(Math.random() * 1010) + 1;

        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
            .then((res) => res.json())
            .then((data) => {
                const simplifiedPokemon = {
                    id: data.id,
                    realsprites: data.sprites.other["official-artwork"].front_default,
                    sprites: data.sprites["front_default"],
                    power: data.stats.reduce((acc, stat) => acc + stat.base_stat, 0),
                };
                setRandomPoke(simplifiedPokemon);
                setIsLoading(false);
                fetchRandomPokemonForChoices(simplifiedPokemon);
            });
    };

    const fetchRandomPokemonForChoices = (randomPoke) => {
        const randomIds = Array.from({ length: 4 }, () =>
            Math.floor(Math.random() * 1010) + 1
        );

        Promise.all(
            randomIds.map((id) =>
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then((res) => res.json())
                    .then((data) => ({
                        id: data.id,
                        realsprites: data.sprites.other["official-artwork"].front_default,
                    }))
            )
        ).then((data) => {
            const choices = [
                ...data,
                { id: randomPoke.id, realsprites: randomPoke.realsprites },
            ];
            setQuizChoices(choices.sort(() => Math.random() - 0.5));
        });
    };

    const handleAnswer = (selectedPokemon) => {
        if (selectedPokemon.id === randomPoke.id) {
            alert("正解！");
            //ローカルストレージに保存
            const catchedPokes = JSON.parse(
                localStorage.getItem("catchedPokes") || "[]"
            );
            catchedPokes.push(randomPoke);
            localStorage.setItem("catchedPokes", JSON.stringify(catchedPokes));

            fetchRandomPokemon();
        } else {
            alert("不正解！");

            fetchRandomPokemon();
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="text-center">ローディング中...</div>
            ) : (
                <>
                    <div
                        className="bg-black w-64 h-64 rounded-full flex items-center justify-center"
                        style={{ filter: "brightness(0%)" }}
                    >
                        <img
                            className="w-32 h-32"
                            src={randomPoke?.realsprites}
                            style={{ filter: "brightness(100%)" }}
                            alt="ランダムなポケモン"
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        {quizChoices.map((choice) => (
                            <div
                                key={choice.id}
                                className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-2"
                                onClick={() => handleAnswer(choice)}
                            >
                                <img
                                    className="w-16 h-16"
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