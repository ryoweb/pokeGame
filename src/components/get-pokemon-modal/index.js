'use client';
import React, { useState } from 'react';

export default function GetPokemonModal(props) {
    //モーダルの開閉管理
    const [isOpen, setIsOpen] = useState(false);
    //モーダルを閉じる
    const onClose = () => {
        setIsOpen(false);
        props.onClose();
    };
    //親要素に伝播させない
    const stopPropagation = (e) => {
        e.stopPropagation();
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
            </div>
        </div>
    );
}