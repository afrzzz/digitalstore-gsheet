import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Ambil thumbnail YouTube
function getYouTubeThumbnail(url) {
  if (!url) return null;
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const id = match && match[7].length === 11 ? match[7] : null;
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export default function ProductCard({ product }) {
  const thumbnail = product.videoUrl
    ? getYouTubeThumbnail(product.videoUrl)
    : product.image;

  return (
    <motion.div
      initial={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg overflow-hidden flex flex-col h-full"
    >
      {/* IMAGE / THUMBNAIL */}
      <div className="relative w-full pt-[56.25%] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2 break-words">
          {product.name}
        </h2>

        <p className="text-base sm:text-lg font-bold text-blue-600 mb-3">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="mt-auto block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium text-sm sm:text-base transition-colors duration-200"
        >
          Detail Video Produk
        </Link>
      </div>
    </motion.div>
  );
}
