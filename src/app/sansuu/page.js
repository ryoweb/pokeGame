'use client';
import { useState, useEffect } from 'react';
import GetItemModal from '../../components/getItemModal';
import LoseModal from '../../components/zannenModal';

export default function Sansuu() {
    //useStateで問題と答えを管理
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
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
    //問題を生成する関数
    useEffect(() => {
        generateTashizanHikizan();
    }, []);
    const generateTashizanHikizan = () => {
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
        generateTashizanHikizan();
    };

    return (
        <>
            {/* 正解時　アイテム取得モーダル */}
            {isGetItemModalOpen && <GetItemModal onClose={handleCloseGetItemModal} />}
            {/* 失敗時　残念モーダル */}
            {isLoseModalOpen && <LoseModal onClose={handleCloseLoseModal} />}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100%' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '200px', padding: '50px', margin: '10px' }}>
                        {question}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '50px', margin: '15px', height: '100px' }}>
                            {userAnswer}
                        </div>
                        <div>
                            {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                                <button key={number} type="button" onClick={() => handleNumberClick(number)}
                                    style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '30px', margin: '5px' }}>
                                    {number}
                                </button>
                            ))}
                            <button type="button" onClick={() => setUserAnswer('')}
                                style={
                                    { border: '1px solid #ccc', borderRadius: '5px', padding: '30px', margin: '5px' }
                                }>
                                けす
                            </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" style={{
                                backgroundColor: 'blue', color: 'white', padding: '35px', borderRadius: '5px', border: 'none', marginTop: '30px'
                            }}>こたえる</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}