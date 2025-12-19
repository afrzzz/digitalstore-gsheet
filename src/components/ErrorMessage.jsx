import React from "react";

export default function ErrorMessage({ error, onRetry }) {
  const message = error?.message || "Terjadi kesalahan. Silakan coba lagi.";

  return (
    <div className="flex flex-col items-center justify-center min-h-48 p-6 bg-white rounded shadow">
      <p className="text-center text-red-600 font-semibold">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}
