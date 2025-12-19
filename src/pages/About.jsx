import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function About() {
  useEffect(() => {
    document.title = "Gumiess Store - About";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex justify-between items-center">
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
            to="/"
            className="text-sm sm:text-sm md:text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Kembali ke Home
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1">
        <div className="max-w-xl sm:max-w-3xl mx-auto px-3 sm:px-6 py-10 sm:py-16">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Tentang Kami
          </h2>

          <p className="text-sm sm:text-base md:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
            <strong>Gumiess Store</strong> adalah toko produk digital yang
            menyediakan berbagai produk siap pakai dengan harga terjangkau. Kami
            fokus pada proses yang sederhana, cepat, dan transparan.
          </p>

          <p className="text-sm sm:text-base md:text-base text-gray-700 leading-relaxed mb-6">
            Semua transaksi diproses langsung oleh admin melalui WhatsApp untuk
            memastikan komunikasi yang jelas dan pelayanan yang responsif. Tidak
            perlu login, tidak ada proses yang rumit.
          </p>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-10 text-xs sm:text-sm md:text-sm text-gray-600">
            <div className="bg-white border rounded-xl p-3 sm:p-6">
              <p className="font-semibold text-gray-900 mb-1 sm:mb-2">
                Mudah & Praktis
              </p>
              <p>Alur pembelian sederhana tanpa akun.</p>
            </div>

            <div className="bg-white border rounded-xl p-3 sm:p-6">
              <p className="font-semibold text-gray-900 mb-1 sm:mb-2">
                Respon Cepat
              </p>
              <p>Admin aktif dan siap membantu.</p>
            </div>

            <div className="bg-white border rounded-xl p-3 sm:p-6">
              <p className="font-semibold text-gray-900 mb-1 sm:mb-2">
                Transparan
              </p>
              <p>Harga jelas tanpa biaya tersembunyi.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 sm:mt-14 text-center">
            <Link
              to="/product"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-6">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 text-center text-xs sm:text-sm text-gray-400">
          © 2025 Gumiess Store • Powered by WhatsApp
        </div>
      </footer>
    </div>
  );
}
