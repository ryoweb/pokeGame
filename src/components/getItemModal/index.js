'use client';
import React, { useState, useEffect } from 'react';
import { BALL_IMAGE_PATH, ITEM_BALL_GET_RATE } from '../../constants';

export default function GetItemModal(props) {
    //useStateでモーダルの開閉を管理
    const [isOpen, setIsOpen] = useState(false);
    //useStateで今回取得したアイテムを管理
    const [gotItem, setGotItem] = useState(null);
    //所持数を管理
    const [items, setItems] = useState({
        monsterBall: getInitialBallCount('monsterBall'),
        superBall: getInitialBallCount('superBall'),
        hyperBall: getInitialBallCount('hyperBall'),
        masterBall: getInitialBallCount('masterBall'),
      });
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

    //ローカルストレージからアイテムを取得
    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
          let items = JSON.parse(localStorage.getItem("items"));
          if (!items) {
            items = { monsterBall: 0, superBall: 0, hyperBall: 0, masterBall: 0 };
            localStorage.setItem("items", JSON.stringify(items));
          }
          setItems(items);
        }
      }, []);

    //アイテムを取得する関数
    const getItem = () => {
        const random = Math.random();
        const ballName = Object.keys(ITEM_BALL_GET_RATE).find((ball) => random < ITEM_BALL_GET_RATE[ball]);

        setItems((prevItems) => {
            const newItems = { ...prevItems };
            newItems[ballName]++;
            localStorage.setItem("items", JSON.stringify(newItems));
            return newItems;
        });

        setGotItem({ image: BALL_IMAGE_PATH[ballName], name: ballName });
    };
    return (
        <div
            className={`modal ${isOpen ? 'open' : ''}`}
            onClick={onClose}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
        >
            <div
                className="modal-content"
                onClick={stopPropagation}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px', borderRadius: '10px', border: '2px solid black' }}
            >
                <h2 style={{ textAlign: 'center' }}>げっと！！</h2>
                {gotItem && <img src={gotItem.image} alt={gotItem.name} />}
            </div>
        </div>
    );
}