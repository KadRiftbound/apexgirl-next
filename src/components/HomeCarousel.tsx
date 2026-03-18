"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const carouselImages = [
  { src: "/assets/images/bgs/file_000000002bbc722fa8aecd2660d92f4b.png", alt: "TopGirl - Discover Artists" },
  { src: "/assets/images/bgs/PZa0kXg48tUA95eC40v6--1--40zmy.jpg", alt: "TopGirl - Build Your Team" },
  { src: "/assets/images/bgs/fxGsW8cYpuse1vzGuTmm--1--aod7t.jpg", alt: "TopGirl - Events & Rewards" },
  { src: "/assets/images/bgs/Screenshot_20260115_051841_ChatGPT.jpg", alt: "TopGirl - Master the Game" },
  { src: "/assets/images/bgs/Screenshot_20260213_103558_ChatGPT.jpg", alt: "TopGirl - Strategy Guides" },
];

export function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  return (
    <div 
      className="carousel-container"
      style={{ 
        marginBottom: "40px",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        position: "relative",
        aspectRatio: "16/9",
        maxHeight: "450px"
      }}
      role="region"
      aria-label="Carousel d'images"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="carousel-track"
        style={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
          height: "100%"
        }}
      >
        {carouselImages.map((image, index) => (
          <div
            key={index}
            style={{
              minWidth: "100%",
              height: "100%",
              position: "relative",
              background: "linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-card) 100%)"
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} sur ${carouselImages.length}: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
              display: "flex",
              alignItems: "flex-end",
              padding: "40px"
            }}>
              <div>
                <h3 style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: 700, 
                  color: "#fff",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}>
                  {image.alt}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          fontSize: "1.25rem",
          transition: "all 0.2s ease"
        }}
        aria-label="Image précédente"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          fontSize: "1.25rem",
          transition: "all 0.2s ease"
        }}
        aria-label="Image suivante"
      >
        ›
      </button>

      {/* Dots */}
      <div 
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px"
        }}
        role="tablist"
        aria-label="Contrôles du carousel"
      >
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: index === currentIndex 
                ? "linear-gradient(90deg, var(--primary), var(--secondary))" 
                : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0
            }}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause/Play indicator for screen readers */}
      <div className="sr-only" aria-live="polite">
        Image {currentIndex + 1} sur {carouselImages.length}: {carouselImages[currentIndex].alt}
      </div>
    </div>
  );
}
