import { useEffect, useRef, useState } from "react";
import { useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollyCanvas({ scrollYProgress }) {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef([]); // Store images in ref to avoid re-renders

  // Configuration - using existing assets found in project
  // User requested .webp but only .pngs exist in /public/sequence
  const frameCount = 120;

  // Map scroll to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // 1. Preload Images
  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      // Check if images are already cached/loaded in this session to avoid re-fetching
      if (imagesRef.current.length === frameCount) {
        setIsLoaded(true);
        return;
      }

      const promises = [];

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        // Using existing pattern found in directory: /sequence/frame_XXX.png
        img.src = `/sequence/frame_${i.toString().padStart(3, "0")}.png`;

        const promise = new Promise((resolve) => {
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error(`Failed to load frame ${i}`);
            resolve(null); // Continue even if error
          };
        });
        promises.push(promise);
      }

      const results = await Promise.all(promises);
      if (isMounted) {
        imagesRef.current = results.filter((img) => img !== null);
        setIsLoaded(true);
      }
    };

    loadImages();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Drawing Logic (Canvas)
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;

    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];

    if (!img) return;

    // High DPI Support
    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.clientWidth * dpr;
    const canvasHeight = canvas.clientHeight * dpr;

    // Only update resolution if changed (prevents flickering)
    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.scale(dpr, dpr);
    }

    // For drawing calculations, use logical CSS pixels
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const imgWidth = img.width;
    const imgHeight = img.height;

    // Calculate scale to cover
    const scale = Math.max(width / imgWidth, height / imgHeight);

    // Center with offset (focus 20% from top)
    const x = (width - imgWidth * scale) / 2;
    const y = (height - imgHeight * scale) * 0.2; // Focus on top 20%

    // Draw
    // Note: We don't clearRect if we are overwriting the whole canvas with 'cover',
    // but it's safer to clear for transparency edge cases.
    // If performance is an issue, remove clearRect.
    // ctx.clearRect(0, 0, width, height);

    // Use polished drawing
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  };

  // 3. Handle Scroll Updates
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded) return;
    const frame = Math.floor(latest);
    requestAnimationFrame(() => renderFrame(frame));
  });

  // 4. Handle Resize & Initial Draw
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      if (canvasRef.current) {
        // Trigger a redraw
        const currentFrame = Math.floor(frameIndex.get());
        renderFrame(currentFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    // Force draw first frame immediately upon load
    const currentFrame = Math.floor(frameIndex.get());
    renderFrame(currentFrame);

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, frameIndex]);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden col-start-1 row-start-1 bg-[#121212]">
      {/* Set explicit dimensions to prevent layout shift */}
      <canvas ref={canvasRef} className="block w-full h-full object-cover" />
    </div>
  );
}
