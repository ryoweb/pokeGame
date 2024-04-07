"use client";
import Link from 'next/link';
export default function Header() {
    return (
        <header className="bg-blue-500 p-4">
            <div className="flex justify-between">
            <Link href="/zukan" className="text-white hover:text-gray-200 px-2">
                    ずかん
                </Link>
                <Link href="/temoti-pokes" className="text-white hover:text-gray-200 px-2">
                    てもち
                </Link>
                <Link href="/get-random-poke" className="text-white hover:text-gray-200 px-2">
                    つかまえる
                </Link>
                <Link href="/quiz" className="text-white hover:text-gray-200 px-2">
                    くいず
                </Link>
                <Link href="/battle" className="text-white hover:text-gray-200 px-2">
                    ばとる
                </Link>
                <Link href="/sansuu" className="text-white hover:text-gray-200 px-2">
                    さんすう
                </Link>
                <Link href="/item" className="text-white hover:text-gray-200 px-2">
                    あいてむ
                </Link>
            </div>
        </header >
    );
}