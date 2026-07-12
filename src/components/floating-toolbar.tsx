"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Plus, Minus } from "lucide-react";

const ALLOWED_SIZES = [12, 13, 14, 15, 16, 17, 18, 19];

export function FloatingToolbar() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [fontSize, setFontSize] = useState(14); // default 14px as in theme.css

  // Detect scroll position to show/hide "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load saved font size on mount
  useEffect(() => {
    const savedSize = localStorage.getItem("site-font-size");
    let currentSize = 14;
    if (savedSize) {
      const size = parseInt(savedSize, 10);
      if (!isNaN(size) && ALLOWED_SIZES.includes(size)) {
        setFontSize(size);
        currentSize = size;
      }
    }
    const scale = currentSize / 14;
    document.documentElement.style.setProperty("--text-scale", `${scale.toFixed(3)}`);
  }, []);

  // Automatic scanner for hardcoded inline font sizes
  useEffect(() => {
    const scanElement = (el: HTMLElement) => {
      // Ignore the floating toolbar itself
      if (el.closest(".fixed.z-\\[9999\\]")) return;

      let originalSize = el.getAttribute("data-orig-font-size");
      if (originalSize === null) {
        const inlineStyle = el.style.fontSize;
        if (inlineStyle) {
          // Save the original font size so we don't lose it on subsequent scans
          el.setAttribute("data-orig-font-size", inlineStyle);
          originalSize = inlineStyle;
        }
      }

      if (originalSize) {
        // Skip if the original font size already contains --text-scale to prevent double-scaling
        if (originalSize.includes("var(--text-scale)")) {
          return;
        }
        el.style.fontSize = `calc(${originalSize} * var(--text-scale))`;
      }
    };

    // Scan initial DOM elements
    const elements = document.querySelectorAll("*");
    elements.forEach((el) => scanElement(el as HTMLElement));

    // Monitor dynamically added nodes (useful for slider card changes, lazy elements, client routing, modals)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            scanElement(el);
            el.querySelectorAll("*").forEach((child) => scanElement(child as HTMLElement));
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [fontSize]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleZoomIn = () => {
    const currentIndex = ALLOWED_SIZES.indexOf(fontSize);
    if (currentIndex !== -1 && currentIndex < ALLOWED_SIZES.length - 1) {
      const newSize = ALLOWED_SIZES[currentIndex + 1];
      setFontSize(newSize);
      const scale = newSize / 14;
      document.documentElement.style.setProperty("--text-scale", `${scale.toFixed(3)}`);
      localStorage.setItem("site-font-size", newSize.toString());
    }
  };

  const handleZoomOut = () => {
    const currentIndex = ALLOWED_SIZES.indexOf(fontSize);
    if (currentIndex !== -1 && currentIndex > 0) {
      const newSize = ALLOWED_SIZES[currentIndex - 1];
      setFontSize(newSize);
      const scale = newSize / 14;
      document.documentElement.style.setProperty("--text-scale", `${scale.toFixed(3)}`);
      localStorage.setItem("site-font-size", newSize.toString());
    }
  };

  const handleReset = () => {
    setFontSize(14);
    document.documentElement.style.setProperty("--text-scale", "1");
    localStorage.setItem("site-font-size", "14");
  };

  return (
    <div 
      className="fixed z-[9999] flex flex-col items-center"
      style={{
        bottom: "24px",
        right: "24px",
        gap: "12px",
        width: "44px",
      }}
    >
      {/* Scroll to Top button */}
      <button
        onClick={handleScrollTop}
        className={`rounded-full bg-earth-brown text-white flex items-center justify-center shadow-lg hover:bg-earth-brown/90 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-[16px] pointer-events-none"
        }`}
        style={{
          width: "44px",
          height: "44px",
        }}
        title="Cuộn lên đầu trang"
        aria-label="Cuộn lên đầu trang"
      >
        <ArrowUp style={{ width: "20px", height: "20px", strokeWidth: 2.5 }} />
      </button>

      {/* Font Size Accessibility Controls */}
      <div 
        className="flex flex-col items-center bg-white rounded-full shadow-lg border border-black/5"
        style={{
          padding: "6px",
          gap: "8px",
          width: "44px",
        }}
      >
        {/* Zoom In button */}
        <button
          onClick={handleZoomIn}
          disabled={fontSize === ALLOWED_SIZES[ALLOWED_SIZES.length - 1]}
          className="rounded-full bg-earth-brown text-white flex items-center justify-center hover:bg-earth-brown/90 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          style={{
            width: "32px",
            height: "32px",
          }}
          title="Phóng to chữ"
          aria-label="Phóng to chữ"
        >
          <Plus style={{ width: "16px", height: "16px", strokeWidth: 3 }} />
        </button>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="rounded-full bg-earth-brown text-white flex items-center justify-center hover:bg-earth-brown/90 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer font-bold select-none"
          style={{
            width: "32px",
            height: "32px",
            fontSize: "14px",
            lineHeight: 1,
          }}
          title="Cỡ chữ mặc định"
          aria-label="Cỡ chữ mặc định"
        >
          A
        </button>

        {/* Zoom Out button */}
        <button
          onClick={handleZoomOut}
          disabled={fontSize === ALLOWED_SIZES[0]}
          className="rounded-full bg-earth-brown text-white flex items-center justify-center hover:bg-earth-brown/90 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          style={{
            width: "32px",
            height: "32px",
          }}
          title="Thu nhỏ chữ"
          aria-label="Thu nhỏ chữ"
        >
          <Minus style={{ width: "16px", height: "16px", strokeWidth: 3 }} />
        </button>
      </div>
    </div>
  );
}
