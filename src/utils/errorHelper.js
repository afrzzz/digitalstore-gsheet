export function getErrorMessage(err) {
  if (!err) return "Terjadi kesalahan.";
  if (typeof err === "string") return err;
  if (err.message) return err.message;
  if (err?.data?.message) return err.data.message;
  return "Terjadi kesalahan tidak diketahui.";
}
