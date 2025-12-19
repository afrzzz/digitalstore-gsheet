import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    document.title = "Gumiess Store";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex justify-between items-center">
          {/* LOGO SHINE GRADIENT */}
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
            to="/about"
            className="text-sm sm:text-sm md:text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Tentang Kami
          </Link>
        </div>
      </header>

      {/* HERO */}
      <main className="flex-1 flex items-center">
        <div className="max-w-xl sm:max-w-4xl mx-auto px-3 sm:px-6 text-center">
          {/* BADGE */}
          <motion.span
            className="inline-block mb-3 sm:mb-5 px-2 sm:px-4 py-1 text-xs sm:text-sm font-semibold rounded-full bg-green-100 text-green-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Harga Mulai Rp 5.000
          </motion.span>

          {/* HEADLINE */}
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug sm:leading-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Produk Digital Murah <br className="sm:hidden" />
            <motion.span
              className="hidden sm:inline text-transparent bg-clip-text font-semibold"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1e3a8a, #2563eb, #1e3a8a)",
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 0%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              Langsung Kirim via WhatsApp
            </motion.span>
            <motion.span
              className="sm:hidden text-transparent bg-clip-text font-semibold"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1e3a8a, #2563eb, #1e3a8a)",
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 0%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              Kirim via WhatsApp
            </motion.span>
          </motion.h2>

          {/* SUBTEXT */}
          <motion.p
            className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Tidak perlu akun. Tidak ribet. Pilih produk, chat admin, langsung
            diproses.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/product"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-12 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg shadow-md hover:shadow-lg transition"
            >
              Lihat Produk Sekarang
            </Link>
          </motion.div>

          {/* TRUST */}
          <motion.div
            className="mt-6 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span>✔ Proses Cepat</span>
            <span>✔ Harga Jelas</span>
            <span>✔ Admin Aktif</span>
            <span>✔ Aman</span>
          </motion.div>
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
