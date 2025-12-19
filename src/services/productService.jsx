import { ENV } from "../config/env";

export async function getProducts() {
  try {
    const res = await fetch(ENV.PRODUCTS_API);
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }

    if (!res.ok) {
      const message = data?.message || res.statusText || `HTTP ${res.status}`;
      const error = new Error(message);
      error.status = res.status;
      error.data = data;
      if (res.status >= 500) {
        error.isServerDown = true;
      }
      throw error;
    }

    return data;
  } catch (err) {
    // network errors (e.g. failed to fetch) show as TypeError in browser
    if (err instanceof TypeError || err?.message === "Failed to fetch") {
      const e = new Error("Tidak dapat terhubung ke server");
      e.isServerDown = true;
      throw e;
    }

    throw err;
  }
}
