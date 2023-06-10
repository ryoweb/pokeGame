"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import "./style.css";

export default function MonsterBall() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2850);
    }, []);

    return (
        <div className={`loader ${isLoading ? "show" : "hide"}`}>
            {/* <img src="../../public/monsterball.jpeg" alt="monsterball" /> */}
            <Image src="/monsterball.png" alt="monsterball" width={100} height={100} />
        </div>
    );
}
