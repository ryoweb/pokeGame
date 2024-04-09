"use client"
import { useEffect, useState } from "react";
import Image from 'next/image';
import MonsterBall from "../../components/monsterball";
import { CAPTURE_RATE_BY_POKEMON_POWER, CAPTURE_RATE_BOOST_BY_BALL, BALL_IMAGE_PATH } from "../../constants";

export default function GetRandomPoke() {
  // ランダムなポケモンの情報を保持するstate
  const [randomPoke, setRandomPoke] = useState(null);
  // ローディング中かどうかを保持するstate
  const [isLoading, setIsLoading] = useState(false);
  // 選択したアイテムを保持するstate
  const [selectedItem, setSelectedItem] = useState(null);
  // 手持ちのアイテムを保持するstate
  const [items, setItems] = useState({});

// localStorageから手持ちのアイテム情報を取得
useEffect(() => {
  if (typeof localStorage !== "undefined") {
    let items = JSON.parse(localStorage.getItem("items"));
    if (!items) {
      items = {"monsterBall":0,"superBall":0,"hyperBall":0,"masterBall":0};
      localStorage.setItem("items", JSON.stringify(items));
    }
    setItems(items);
  }
}, []);
  
  useEffect(() => {
    fetchRandomPokemon();
  }, []);
  // ランダムなポケモンを取得
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
          backsprites: data.sprites["back_default"],
          power: data.stats.reduce((acc, stat) => acc + stat.base_stat, 0),
        };
        setRandomPoke(simplifiedPokemon);
        setIsLoading(false);
      });
  };

  // ポケモン捕獲
  const handleCatch = () => {
    let catchedPokes = [];
    if (isLoading || !randomPoke || !selectedItem) {
      return;
    }
    if (typeof localStorage !== 'undefined') {
      catchedPokes = JSON.parse(localStorage.getItem("catchedPokes") || "[]");
    }
    // statusによって捕獲率を変更
    const random = Math.random();
    let captureRate = 0.8;
    Object.keys(CAPTURE_RATE_BY_POKEMON_POWER).forEach((power) => {
      if (randomPoke.power > power) {
        captureRate = CAPTURE_RATE_BY_POKEMON_POWER[power];
      }
    });
    //利用するボールによって捕獲率を変更
    if (selectedItem in CAPTURE_RATE_BOOST_BY_BALL) {
      if (selectedItem === "masterBall") {
        captureRate = CAPTURE_RATE_BOOST_BY_BALL[selectedItem];
      } else {
        captureRate -= CAPTURE_RATE_BOOST_BY_BALL[selectedItem];
      }
    }
    //捕獲成功時
    if (random < captureRate) {

      if(typeof localStorage !== "undefined"){
        const catchedPokes = JSON.parse(localStorage.getItem("catchedPokes") || "[]");
      }
      catchedPokes.push(randomPoke);
      localStorage.setItem("catchedPokes", JSON.stringify(catchedPokes));
      setTimeout(() => {
        alert("つかまえた！〇");
      }, 3000);
      setRandomPoke(null);
    } else {
      setTimeout(() => {
        alert("にげられた！×");
      }, 3000);
      setRandomPoke(null);
    }
    // ローディング中にする
    setIsLoading(true);
    // アイテムのデクリメントと更新
    decrementAndUpdateItems(selectedItem);
  };

  // 選択したボールをセットする関数
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };
  // 利用したボールのデクリメントと手持ちボールの状態更新を行う関数
  const decrementAndUpdateItems = (selectedItem) => {
    const updatedItems = { ...items };
    if (updatedItems[selectedItem] > 0) {
      updatedItems[selectedItem]--;
      setItems(updatedItems);
      // 手持ちのボールが0になったら選択状態を解除
      if (updatedItems[selectedItem] === 0) {
        setSelectedItem(null);
      }
    }
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };
  // ボールの情報を保持する配列
  const balls = Object.keys(BALL_IMAGE_PATH).map(name => ({ name, src: BALL_IMAGE_PATH[name] }));

  return (
    <div style={{ backgroundImage: "url(/stage_kusa.jpeg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh", width: "100%" }} className="flex flex-col items-center justify-center">
    <div className="encount-pokemon-container flex justify-center items-center" style={{ position: 'fixed', top: 200, width: '100%' }}>
      {randomPoke ? (
        <Image
          src={randomPoke?.realsprites}
          onLoad={() => setIsLoading(false)}
          alt="random pokemon"
          width={300}
          height={300}
        />
      ) : (
        <MonsterBall />
      )}
    </div>
      {/* アイテム選択コンテナー */}
      <div className="ball-container flex justify-center items-center" style={{ position: 'fixed', bottom: 60, width: '100%' }}>

        {balls.map((ball) => (
          <button
            key={ball.name}
            onClick={() => handleItemSelect(ball.name)}
            // ボールが0個の場合は選択を不可能に
            disabled={items[ball.name] <= 0}
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              backgroundColor: selectedItem === ball.name ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(5px)"
            }}
          >
            <Image
              src={ball.src}
              alt={ball.name}
              width={50}
              height={50}
            />
            x{items[ball.name]}
          </button>
        ))}
      </div>
      {/* 行動選択コンテナー */}
      <div className="flex justify-center items-center mt-6 space-x-4" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <button
          onClick={handleCatch}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-2xl"
          disabled={isLoading || !randomPoke || !selectedItem}
        >
          つかまえる
        </button>

        <button
          onClick={fetchRandomPokemon}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-2xl"
        >
          さがす
        </button>
      </div>
    </div>
  );
}