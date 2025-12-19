import { useState } from "react";

export default function VideoPlayer({ url }) {
  const [play, setPlay] = useState(false);

  if (!url) return <div className="text-gray-400">Video belum tersedia</div>;

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isDirectVideo = url.endsWith(".mp4") || url.endsWith(".webm");

  // Direct video (mp4/webm) tetap autoplay
  if (isDirectVideo) {
    return (
      <video
        src={url}
        className="w-full max-w-md aspect-video rounded-3xl shadow-lg object-cover"
        controls
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  // YouTube lazy load
  if (isYouTube) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const id = match && match[7].length === 11 ? match[7] : null;
    if (!id) return <div className="text-gray-400">Video tidak valid</div>;

    // Jika belum play, tampilkan thumbnail + tombol play
    if (!play) {
      return (
        <div
          className="w-full max-w-md aspect-video rounded-3xl overflow-hidden shadow-lg bg-black relative cursor-pointer"
          onClick={() => setPlay(true)}
        >
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white rounded-full p-3 text-xl">▶️</button>
          </div>
        </div>
      );
    }

    // Setelah klik, render iframe
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}?controls=1&mute=1`}
        title="YouTube Video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-full max-w-md aspect-video rounded-3xl shadow-lg"
      />
    );
  }

  // Jika bukan mp4/webm atau YouTube
  return <div className="text-gray-400">Video tidak didukung</div>;
}
