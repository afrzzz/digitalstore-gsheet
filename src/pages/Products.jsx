import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [newProductIds, setNewProductIds] = useState(new Set());
  const prevProductsRef = useRef([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      const productList = Array.isArray(data) ? data : [];

      // Cek produk baru dibanding sebelumnya
      const prevIds = new Set(prevProductsRef.current.map((p) => p.id));
      const newIds = productList
        .filter((p) => !prevIds.has(p.id))
        .map((p) => p.id);

      if (newIds.length > 0) {
        setNewProductIds((prev) => new Set([...prev, ...newIds]));
      }

      setProducts(productList);
      prevProductsRef.current = productList;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Gumiess Store - Product";
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000); // polling tiap 5 detik
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 640 ? 10 : 9);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1
              className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1e3a8a, #2563eb, #1e3a8a)",
              }}
            >
              Daftar Produk
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm text-gray-500 mt-1"
            >
              Produk digital{" "}
              <span className="font-semibold text-green-600">
                langsung kirim via WhatsApp
              </span>
            </motion.p>
          </div>

          <SearchInput search={search} setSearch={setSearch} />
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {loading ? (
          <Loader />
        ) : filteredProducts.length > 0 ? (
          <motion.div
            key={currentPage}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {paginatedProducts.map((item) => {
                const isNew = newProductIds.has(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20, scale: isNew ? 1.1 : 1 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProductCard product={item} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 py-24">
            <p className="text-base sm:text-lg font-semibold">
              Produk tidak ditemukan
            </p>
            <p className="text-sm mt-1">Coba kata kunci lain</p>
          </div>
        )}
      </main>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* FOOTER */}
      <footer className="text-center text-xs sm:text-sm text-gray-400 py-6">
        © 2025 Gumiess Store • Powered by WhatsApp
      </footer>
    </div>
  );
}
