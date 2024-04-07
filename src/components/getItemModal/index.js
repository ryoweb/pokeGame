'use client';
import React, { useState, useEffect } from 'react';

export default function GetItemModal(props) {
    //useStateでモーダルの開閉を管理
    const [isOpen, setIsOpen] = useState(false);
    //useStateで今回取得したアイテムを管理
    const [gotItem, setGotItem] = useState(null);
    //useStateで所持数を管理
    const [monsterBall, setMonsterBall] = useState(getInitialBallCount('monsterBall'));
    const [superBall, setSuperBall] = useState(getInitialBallCount('superBall'));
    const [hyperBall, setHyperBall] = useState(getInitialBallCount('hyperBall'));
    const [masterBall, setMasterBall] = useState(getInitialBallCount('masterBall'));
    //アイテムの画像
    const monsterBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    const superBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png';
    const hyperBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png';
    const masterBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png';
    //所持数の初期値を取得する関数
    function getInitialBallCount(ballName) {
        if (typeof localStorage !== 'undefined') {
            const items = JSON.parse(localStorage.getItem("items"));
            return items ? items[ballName] : 0;
        }
        return 0;
    }

    //モーダルを閉じる
    const onClose = () => {
        setIsOpen(false);
        props.onClose();
    };

    //親要素に伝播させない
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    //呼び出されるたびにアイテムを取得
    useEffect(() => {
        //このコンポーネントが呼び出されたときにモーダルを開く
        setIsOpen(true);
        //アイテムの初期値を取得する
        getInitialBallCount();
        //アイテムを取得する関数を呼び出す
        getItem();
    }, [props.isOpen]);

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

    //アイテムを取得する関数
    const getItem = () => {
        const random = Math.random();
        if (random < 0.6) {
            setMonsterBall(prevMonsterBall => {
                const newMonsterBall = prevMonsterBall + 1;
                const items = JSON.parse(localStorage.getItem("items"));
                items.monsterBall = newMonsterBall;
                localStorage.setItem("items", JSON.stringify(items));
                return newMonsterBall;
            });
            setGotItem({ image: monsterBallImage, name: 'Monster Ball' });
        } else if (random < 0.9) {
            setSuperBall(prevSuperBall => {
                const newSuperBall = prevSuperBall + 1;
                localStorage.setItem("items", JSON.stringify({ ...JSON.parse(localStorage.getItem("items")), superBall: newSuperBall }));
                return newSuperBall;
            });
            setGotItem({ image: superBallImage, name: 'Super Ball' });
        } else if (random < 0.99) {
            setHyperBall(prevHyperBall => {
                const newHyperBall = prevHyperBall + 1;
                localStorage.setItem("items", JSON.stringify({ ...JSON.parse(localStorage.getItem("items")), hyperBall: newHyperBall }));
                return newHyperBall;
            });
            setGotItem({ image: hyperBallImage, name: 'Hyper Ball' });
        } else {
            setMasterBall(prevMasterBall => {
                const newMasterBall = prevMasterBall + 1;
                localStorage.setItem("items", JSON.stringify({ ...JSON.parse(localStorage.getItem("items")), masterBall: newMasterBall }));
                return newMasterBall;
            });
            setGotItem({ image: masterBallImage, name: 'Master Ball' });
        }
    }
    return (
        <div
            className={`modal ${isOpen ? 'open' : ''}`}
            onClick={onClose}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
        >
            <div
                className="modal-content"
                onClick={stopPropagation}
                style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px'}}
            >
                <h2>げっと！！</h2>
                {gotItem && <img src={gotItem.image} alt={gotItem.name} />}
            </div>
        </div>
    );
}