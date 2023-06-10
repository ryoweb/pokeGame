"use client";
import Link from 'next/link';
export default function Header() {
    return (
        // tailwindを用いたheaderの作成
        // Linkは/temoti-pokes,/get-random-poke,/quiz
        <header className="bg-gray-900 text-white flex justify-between px-4 py-2">
            <div className="flex items-center">
                <Link href="/temoti-pokes" className="mr-4">
                    てもちのポケモン/
                </Link>
                <Link href="/get-random-poke">
                    つかまえにいく/
                </Link>
                <Link href="/quiz" className="ml-4">
                    クイズ/
                </Link>
                <Link href="/zukan" className="ml-4">
                    ずかん/
                </Link>
                <Link href="/battle">
                    バトル
                </Link>
            </div>
        </header>

    );
}