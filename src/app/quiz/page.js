"use client";
import { useEffect, useState } from "react";
import MonsterBall from "../../components/monsterball";
import GetItemModal from "../../components/getItemModal";
import LoseModal from "../../components/zannenModal";

export default function GetRandomPoke() {
    const [randomPoke, setRandomPoke] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quizChoices, setQuizChoices] = useState([]);
    //useStateでアイテム取得モーダルの開閉を管理
    const [isGetItemModalOpen, setIsGetItemModalOpen] = useState(false);
    //ざんねんモーダルの開閉を管理
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

    const fetchRandomPokemon = async () => {
        setIsLoading(true);
        const randomId = Math.floor(Math.random() * 1010) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
    
        const simplifiedPokemon = {
            id: data.id,
            realsprites: data.sprites.other["official-artwork"].front_default,
        };
    
        const newQuizChoices = await fetchRandomPokemonForChoices(simplifiedPokemon);
    
        setRandomPoke(simplifiedPokemon);
        setQuizChoices(newQuizChoices);
    
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
    
        return choices.sort(() => Math.random() - 0.5);
    };

    const handleAnswer = (selectedPokemon) => {
        if (selectedPokemon.id === randomPoke.id) {
            setIsGetItemModalOpen(true);
        } else {
            setIsLoseModalOpen(true);
        }
        fetchRandomPokemon();
    };
    return (
        <>
            {/* 正解時　アイテム取得モーダル */}
            {isGetItemModalOpen && <GetItemModal onClose={handleCloseGetItemModal} />}
            {/* 失敗時　ざんねんモーダル */}
            {isLoseModalOpen && <LoseModal onClose={handleCloseLoseModal} />}
            {isLoading ? (
                //ローディング画面　モンスターボール　中央に配置
                <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
                    <MonsterBall />
                </div>
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