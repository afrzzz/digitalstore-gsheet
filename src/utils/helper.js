// Ambil thumbnail YouTube dari URL
export function getYouTubeThumbnail(url) {
  if (!url) return null;

  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const id = match && match[7].length === 11 ? match[7] : null;
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
