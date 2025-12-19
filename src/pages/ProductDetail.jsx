import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import { ENV } from "../config/env";
import { motion } from "framer-motion";
import VideoPlayer from "../components/VideoPlayer";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = () => {
      setLoading(true);
      setError(null);
      getProducts()
        .then((data) => {
          const found = Array.isArray(data)
            ? data.find((p) => String(p.id) === id)
            : null;
          setProduct(found);
        })
        .catch((err) => {
          if (err?.isServerDown) {
            navigate("/server-down");
            return;
          }
          setError(err);
        })
        .finally(() => setLoading(false));
    };

    fetch();
  }, [id]);

  useEffect(() => {
    document.title = product
      ? `Gumiess Store - ${product.name}`
      : "Gumiess Store";
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <ErrorMessage
          error={error}
          onRetry={() => {
            setLoading(true);
            setError(null);
            getProducts()
              .then((data) => {
                const found = Array.isArray(data)
                  ? data.find((p) => String(p.id) === id)
                  : null;
                setProduct(found);
              })
              .catch((err) => setError(err))
              .finally(() => setLoading(false));
          }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gray-50">
        <p className="text-lg font-semibold mb-2">Produk tidak ditemukan</p>
        <Link to="/product" className="text-blue-600 hover:underline">
          Kembali ke daftar produk
        </Link>
      </div>
    );
  }

  const waText = `Halo Gumiess Store 👋

Saya tertarik untuk membeli produk berikut:

📌 Produk  : ${product.name}
💰 Harga  : Rp ${Number(product.price).toLocaleString("id-ID")}

Mohon info lebih lanjut untuk proses pemesanannya. Terima kasih 🙏`;

  const waLink = `https://wa.me/${ENV.WA_NUMBER}?text=${encodeURIComponent(
    waText
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="font-bold text-lg sm:text-2xl md:text-3xl text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #1e3a8a, #2563eb, #1e3a8a)",
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 0%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            Gumiess Store
          </motion.h1>
          <Link
            to="/product"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Kembali ke Produk
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-12">
        {/* VIDEO */}
        <div className="md:w-1/2 flex justify-center items-center">
          <VideoPlayer url={product.videoUrl} />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="md:w-1/2 flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-2xl font-extrabold text-blue-600">
            Rp {Number(product.price).toLocaleString("id-ID")}
          </p>
          {product.description && (
            <p className="text-gray-700 text-base leading-relaxed">
              {product.description}
            </p>
          )}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md text-center transition-all duration-200"
          >
            Beli via WhatsApp
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs sm:text-sm text-gray-400 py-6 border-t mt-auto bg-white">
        © 2025 Gumiess Store • Powered by WhatsApp
      </footer>
    </div>
  );
}
