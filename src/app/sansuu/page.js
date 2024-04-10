'use client';
import { useState, useEffect } from 'react';
import GetItemModal from '../../components/get-item-modal';
import LoseModal from '../../components/miss-modal';

export default function Sansuu() {
    //useStateで問題と答えを管理
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    //useStateでアイテム取得モーダルの開閉を管理
    const [isGetItemModalOpen, setIsGetItemModalOpen] = useState(false);
    //ざんねんモーダルの開閉を管理
    const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
    //手持ちポケモンの情報を管理
    const [pokemons, setPokemons] = useState([]);
    // ポケモンの位置を管理
    const [pokemonPositions, setPokemonPositions] = useState([]);

    // 応援ポケモンの最大数を設定
    const MAX_POKEMONS = 50;

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            let storedPokes = JSON.parse(localStorage.getItem('catchedPokes') || '[]');
            // 応援ポケモンの数が最大数を超えていたら、最初の最大数だけを取得
            if (storedPokes.length > MAX_POKEMONS) {
                storedPokes = storedPokes.slice(0, MAX_POKEMONS);
            }
            setPokemons(storedPokes);
            // ポケモンの位置をランダムに設定
            const positions = storedPokes.map(() => ({
                top: Math.floor(Math.random() * 100),
                left: Math.floor(Math.random() * 100),
            }));
            setPokemonPositions(positions);
        }
    }, []);

    //モーダルを閉じる関数
    const handleCloseGetItemModal = () => {
        setIsGetItemModalOpen(false);
    }
    //ざんねんモーダルを閉じる関数
    const handleCloseLoseModal = () => {
        setIsLoseModalOpen(false);
    }
    // //問題を生成する関数
    const generateTashizanHikizanLv1 = () => {
        let num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10);
        let operator = Math.random() > 0.5 ? '+' : '-';
        // 演算結果がマイナス時の対策　前後を入れ替える
        if (operator === '-' && num1 < num2) {
            [num1, num2] = [num2, num1];
        }
        const question = `${num1} ${operator} ${num2}`;
        setQuestion(question);
        setAnswer(eval(question));
        setUserAnswer('');
    };
    // ２桁と２桁の足し算引き算
    const generateTashizanHikizanLv2 = () => {
        let num1 = Math.floor(Math.random() * 90) + 10;
        let num2 = Math.floor(Math.random() * 90) + 10;
        let operator = Math.random() > 0.5 ? '+' : '-';
        // 演算結果がマイナス時の対策　前後を入れ替える
        if (operator === '-' && num1 < num2) {
            [num1, num2] = [num2, num1];
        }
        const question = `${num1} ${operator} ${num2}`;
        setQuestion(question);
        setAnswer(eval(question));
        setUserAnswer('');
    }

    useEffect(() => {
        // 50%の確率でレベル1の問題を出題
        if (Math.random() > 0.5) {
            generateTashizanHikizanLv1();
        } else {
            generateTashizanHikizanLv2();
        }
    }, []);

    const handleNumberClick = (number) => {
        setUserAnswer(userAnswer + number);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(userAnswer) === answer) {
            setIsGetItemModalOpen(true);
        } else {
            setIsLoseModalOpen(true);
        }
        // 90%の確率でレベル1の問題を出題
        if (Math.random() > 0.1) {
            generateTashizanHikizanLv1();
        } else {
            generateTashizanHikizanLv2();
        }
    };

    return (
        <>
            {/* 正解時　アイテム取得モーダル */}
            {isGetItemModalOpen && <GetItemModal onClose={handleCloseGetItemModal} />}
            {/* 失敗時　残念モーダル */}
            {isLoseModalOpen && <LoseModal onClose={handleCloseLoseModal} />}
            <div className="flex justify-center items-center max-w-full">
                <div>
                    {/* 手持ちポケモンを応援で表示 */}
                    {pokemons.map((pokemon, index) => (
                        <img key={index} src={pokemon.sprites} alt={`pokemon-${index}`} style={{ position: 'absolute', top: `${pokemonPositions[index].top}vh`, left: `${pokemonPositions[index].left}vw`, zIndex: -1 }} />
                    ))}
                    {/* 問題の式を表示 */}
                    <div className="flex justify-center items-center text-9xl p-12 m-2">
                        {question}
                    </div>
                    {/* 回答入力フォーム */}
                    <form onSubmit={handleSubmit}>

                        <div className="border border-gray-300 rounded p-12 m-3 h-24">
                            {userAnswer}
                        </div>

                        <div>
                            {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                                <button key={number} type="button" onClick={() => handleNumberClick(number)}
                                    className="border border-gray-300 rounded p-8 m-2">
                                    {number}
                                </button>
                            ))}

                            <button type="button" onClick={() => setUserAnswer('')}
                                className="border border-gray-300 rounded p-8 m-1">
                                けす
                            </button>

                        </div>

                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-500 text-white p-9 rounded border-none mt-7">
                                こたえる
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}