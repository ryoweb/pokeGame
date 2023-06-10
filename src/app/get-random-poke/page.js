"use client"
import { useEffect, useState } from "react";

export default function GetRandomPoke() {
  const [randomPoke, setRandomPoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ポケモンをランダムに取得する
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

  // ポケモンを捕獲する
  const handleCatch = () => {
    if (isLoading || !randomPoke) {
      // 画像がまだロードされていない場合やローディング中の場合はクリックを無効化
      return;
    }

    const catchedPokes = JSON.parse(localStorage.getItem("catchedPokes") || "[]");
    const random = Math.random();
    // デフォルト捕獲率を70%に設定
    let captureRate = 0.7;

    // statusが500を超えると捕獲率を30%にする
    if (randomPoke.power > 500) {
      captureRate = 0.3;
    }

    // statusが600を超えると捕獲率を15%にする
    if (randomPoke.power > 600) {
      captureRate = 0.15;
    }

    if (random < captureRate) {
      catchedPokes.push(randomPoke);
      localStorage.setItem("catchedPokes", JSON.stringify(catchedPokes));
      alert("つかまえた！〇");
    } else {
      alert("にげられた！×");
    }
    setIsLoading(true);
    fetchRandomPokemon();
  };

  return (
    <>
      {/* 背景をpublic/stage_kusaにする */}
      <div className="bg-cover bg-center bg-no-repeat w-screen h-screen" style={{ backgroundImage: "url(/stage_kusa.jpeg)", backgroundRepeat: "no-repeat" }}>
        <div className="flex justify-center">
          <div className="w-32 h-32">
            <img
              className="w-full h-full"
              src={randomPoke?.realsprites}
              onLoad={() => setIsLoading(false)} // 画像がロードされたらisLoadingをfalseに設定
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {/* catch */}
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          onClick={handleCatch}
          style={{ fontSize: "40px" }}
          disabled={isLoading || !randomPoke} // isLoadingがtrueまたはrandomPokeがnullの場合はクリックを無効化
        >
          つかまえる
        </button>

        {/* 別のポケモンを探す */}
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          onClick={fetchRandomPokemon}
          style={{ fontSize: "40px" }}
        >
          さがす
        </button>

        {/* temoti */}
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            location.href = "/temoti-pokes";
          }}
          style={{ fontSize: "40px" }}
        >
          てもちのポケモン
        </button>
      </div>
    </>
  );
}