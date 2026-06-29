import { useState, useEffect } from "react";

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    // Prevent body scrolling when lightbox is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, images.length]);

  return (
    <div className="bg-white p-6 shadow-sm border border-outline-variant/30">
      {/* Main image */}
      <div 
        className="aspect-video w-full overflow-hidden mb-4 cursor-pointer relative group"
        onClick={() => openLightbox(activeIndex)}
      >
        <img
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:scale-[1.01] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300" style={{ fontSize: "36px" }}>
            zoom_in
          </span>
        </div>
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
            onClick={() => openLightbox(3)}
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

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 md:p-6 select-none animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex justify-between items-center text-white/90 w-full max-w-7xl mx-auto py-2">
            <div>
              <h4 className="font-semibold text-sm md:text-base line-clamp-1">{title}</h4>
              <p className="text-xs text-white/60 mt-0.5">
                Hình ảnh {lightboxIndex + 1} / {images.length}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>close</span>
            </button>
          </div>

          {/* Main Content Area (Image + Left/Right arrows) */}
          <div className="flex-1 flex items-center justify-between w-full max-w-7xl mx-auto relative min-h-0 py-4">
            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 border border-white/10 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>chevron_left</span>
            </button>

            {/* Image Container */}
            <div className="w-full h-full flex items-center justify-center p-2 md:p-4">
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className="max-h-[65vh] max-w-full object-contain rounded-sm shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 border border-white/10 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>chevron_right</span>
            </button>
          </div>

          {/* Footer (Thumbnail Strip) */}
          <div className="w-full max-w-4xl mx-auto py-2">
            <div className="flex gap-2 overflow-x-auto justify-start md:justify-center py-2 px-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 aspect-square overflow-hidden rounded cursor-pointer transition-all duration-200 ${
                    i === lightboxIndex
                      ? "ring-2 ring-antique-gold ring-offset-2 ring-offset-black scale-105"
                      : "opacity-40 hover:opacity-80 hover:scale-102"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
