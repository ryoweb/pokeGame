'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BALL_IMAGE_PATH } from '@/constants';

export default function ItemFooter(props) {
    //useStateで所持数を管理
    const [items, setItems] = useState({ monsterBall: 0, superBall: 0, hyperBall: 0, masterBall: 0 });

    //ローカルストレージから所持数を取得
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

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-center', alignItems: 'center' }}>
                {Object.keys(items).map((item) => (
                    <span key={item}>
                        <Image src={BALL_IMAGE_PATH[item]} alt={`${item} image`} width={50} height={50} />　x {items[item]}
                    </span>
                ))}
            </div>
        </div>
    );
}