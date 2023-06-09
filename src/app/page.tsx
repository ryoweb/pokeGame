export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="text-center text-4xl font-bold m-10">pokes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-max	 gap-6 m-10">
        {/* つかまえる */}
        <a
          href="/get-random-poke"
          className="flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-lg p-6 hover:bg-gray-200"
        >
          つかまえる
        </a>
        <br />
        {/* 手持ち*/}
        <a
          href="/temoti-pokes"
          className="flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-lg p-6 hover:bg-gray-200"
        >
          てもちのポケモン
        </a>
      </div>
    </main>
  );
}
