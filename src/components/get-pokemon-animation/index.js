"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import "./style.css";
import { BALL_IMAGE_PATH } from '@/constants';

export default function MonsterBall({ ballType }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2850);
    }, []);

    //　ballTypeがない場合はじゅんびちゅうと表示　つかまえるの初回レンダリング時など
    if (ballType === null) {
        return <p>じゅんびちゅう</p>;
    }

    return (
        <div className={`loader ${isLoading ? "show" : "hide"}`}>
            <Image src={BALL_IMAGE_PATH[ballType]} width={100} height={100} />
        </div>
    );
}