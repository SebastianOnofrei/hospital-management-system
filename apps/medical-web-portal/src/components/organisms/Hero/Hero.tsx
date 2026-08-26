import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Hero.css';

// Defining the shape of a single slide for the Hero component
export interface HeroSlide {
  image: string;
  text: string;
  alt?: string;
}

// Defining the props for the Hero component, which can accept either a single slide or an array of slides
export interface HeroProps {
  data: HeroSlide | HeroSlide[];
  interval?: number;
}

export const Hero: React.FC<HeroProps> = ({ data, interval = 5000 }) => {
  const slides = useMemo(() => (Array.isArray(data) ? data : [data]), [data]);
  const [index, setIndex] = useState(0);
  const isSlider = slides.length > 1;

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!isSlider) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [isSlider, interval, next]);

  return (
    <div className="hero" style={{ '--active-index': index } as React.CSSProperties}>
      <div className="hero-track">
        {slides.map((slide, i) => (
          <div className="hero-slide" key={i}>
            <img src={slide.image} alt={slide.alt || slide.text} loading={i === 0 ? 'eager' : 'lazy'} />
            <div className="hero-overlay" />
            <p className="hero-text">{slide.text}</p>
          </div>
        ))}
      </div>

      {isSlider && (
        <>
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="hero-nav">
            {/* Button icon will be changed with atom svg icon in the future */}
            <button onClick={prev} aria-label="Previous">‹</button>
            <button onClick={next} aria-label="Next">›</button>
          </div>
        </>
      )}
    </div>
  );
};