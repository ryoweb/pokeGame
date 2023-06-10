"use client";
import Link from 'next/link';
export default function Header() {
    return (
        // tailwindを用いたheaderの作成
        // Linkは/temoti-pokes,/get-random-poke,/quiz
        <header>
            <div>
                <Link href="/temoti-pokes">
                    てもちのポケモン/
                </Link>
                <Link href="/get-random-poke">
                    つかまえにいく/
                </Link>
                <Link href="/quiz">
                    クイズ/
                </Link>
                <Link href="/zukan">
                    ずかん/
                </Link>
                <Link href="/battle">
                    バトル
                </Link>
            </div>
        </header >

    );
}