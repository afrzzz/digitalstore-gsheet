import { Link } from "react-router-dom";

export default function SearchInput({ search, setSearch }) {
  return (
    <div className="flex gap-2 sm:gap-3 items-center w-full md:w-auto">
      <input
        type="text"
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-64 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
      />
      <Link
        to="/"
        className="inline-flex px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base hover:bg-gray-100 transition"
      >
        Home
      </Link>
    </div>
  );
}
