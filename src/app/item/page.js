'use client'  
import React, { useState, useEffect } from 'react';

export default function ItemFooter(props) {
    //useStateで所持数を管理
    const [monsterBall, setMonsterBall] = useState(0);
    const [superBall, setSuperBall] = useState(0);
    const [hyperBall, setHyperBall] = useState(0);
    const [masterBall, setMasterBall] = useState(0);
    const monsterBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    const superBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png';
    const hyperBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png';
    const masterBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png';

    //ローカルストレージから所持数を取得
    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            let items = JSON.parse(localStorage.getItem("items"));
            if (!items) {
                items = { monsterBall: 0, superBall: 0, hyperBall: 0, masterBall: 0 };
                localStorage.setItem("items", JSON.stringify(items));
            }
            setMonsterBall(items.monsterBall);
            setSuperBall(items.superBall);
            setHyperBall(items.hyperBall);
            setMasterBall(items.masterBall);
        }
    }, []);

    return (
        <div>
            <h2>所持数</h2>
            <div style={{ display: 'flex', justifyContent: 'space-center', alignItems: 'center' }}>
                <span>
                    {monsterBallImage && <img src={monsterBallImage} alt="Monster Ball" />}: {monsterBall}
                </span>
                <span>
                    {superBallImage && <img src={superBallImage} alt="Super Ball" />}: {superBall}
                </span>
                <span>
                    {hyperBallImage && <img src={hyperBallImage} alt="Hyper Ball" />}: {hyperBall}
                </span>
                <span>
                    {masterBallImage && <img src={masterBallImage} alt="Master Ball" />}: {masterBall}
                </span>
            </div>
        </div>
    );
}