import { ENV } from "../config/env";

export async function getProducts() {
  const res = await fetch(ENV.PRODUCTS_API);
  if (!res.ok) throw new Error("Gagal mengambil produk");
  return res.json();
}
