"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  velocity: { x: number; y: number };
}

export default function ConstellationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const velocityRef = useRef(0);

  // Track scroll velocity manually
  useEffect(() => {
    let lastY = window.scrollY;
    let rafId: number;
    let lastTime = performance.now();
    let accel = 0;
    let samples = 0;

    const measure = (time: number) => {
      const currentY = window.scrollY;
      const deltaY = Math.abs(currentY - lastY);
      const deltaTime = time - lastTime;

      if (deltaTime > 16) {
        const instant = deltaY / (deltaTime / 1000);
        accel += instant;
        samples++;
        if (samples >= 3) {
          velocityRef.current = accel / samples;
          accel = 0;
          samples = 0;
        }
        lastY = currentY;
        lastTime = time;
      }

      if (deltaY === 0) {
        velocityRef.current *= 0.92;
      }

      rafId = requestAnimationFrame(measure);
    };

    rafId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initStars();
      }
    };

    resize();
    window.addEventListener("resize", resize);

    function initStars() {
      const starCount = Math.min(80, Math.floor((width * height) / 15000));
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.5 + 0.3,
        velocity: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        },
      }));
    }

    function animate(_time: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;
      const scrollVel = velocityRef.current;

      stars.forEach((star, i) => {
        star.x += star.velocity.x + scrollVel * 0.5;
        star.y += star.velocity.y;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const alpha = star.brightness + Math.sin(Date.now() * 0.002 + i) * 0.2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${Math.max(0.1, alpha)})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        gradient.addColorStop(0, `rgba(201, 168, 76, ${alpha * 0.3})`);
        gradient.addColorStop(1, "rgba(201, 168, 76, 0)");
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(201, 168, 76, 0.08)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate(0);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
