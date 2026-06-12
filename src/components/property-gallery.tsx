import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface PropertyGalleryProps {
  images: GalleryImage[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="bg-white p-6 shadow-sm border border-outline-variant/30">
      {/* Main image */}
      <div className="aspect-video w-full overflow-hidden mb-4">
        <img
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 3).map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`aspect-square overflow-hidden cursor-pointer ${
              i === activeIndex
                ? "border-2 border-antique-gold"
                : "border border-outline-variant/30 hover:opacity-80 transition-opacity"
            }`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* "View more" last thumbnail */}
        {images.length > 3 && (
          <div
            className="aspect-square overflow-hidden relative cursor-pointer group border border-outline-variant/30"
            onClick={() => setActiveIndex(3)}
          >
            <img
              src={images[3]?.src ?? images[0].src}
              alt="More photos"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-label-caps"
                 style={{ fontSize: "10px" }}>
              Xem thêm
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-on-surface-variant hover:text-antique-gold transition-colors"
        >
          <span
            className="material-symbols-outlined text-antique-gold"
            style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          <span className="font-label-caps" style={{ fontSize: "12px" }}>
            Yêu thích ({likeCount})
          </span>
        </button>
        <button className="flex items-center gap-2 text-on-surface-variant hover:text-antique-gold transition-colors">
          <span className="material-symbols-outlined text-antique-gold">share</span>
          <span className="font-label-caps" style={{ fontSize: "12px" }}>
            Chia sẻ
          </span>
        </button>
      </div>
    </div>
  );
}
