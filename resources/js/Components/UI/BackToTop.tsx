import { useState, useEffect } from 'react';

/**
 * Back to Top Button Component
 * Floating button yang muncul saat user scroll down
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-[9998] bg-[#7C634D] text-white p-3 rounded-full shadow-lg hover:bg-[#65503D] transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C634D] focus-visible:ring-offset-2 group"
      aria-label="Back to top"
      title="Back to top"
    >
      <svg
        className="w-5 h-5 transition-transform group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
