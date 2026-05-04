"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Torus, Ring } from "@react-three/drei";
import * as THREE from "three";

const ZODIAC_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

interface GlyphSpriteProps {
  angle: number;
  radius: number;
}

function GlyphSprite({ angle, radius }: GlyphSpriteProps) {
  const meshRef = useRef<THREE.Sprite>(null);

  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle bobbing
      meshRef.current.position.y = y + Math.sin(state.clock.elapsedTime * 2 + angle) * 0.15;
    }
  });

  // Create canvas texture with glyph
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#C9A84C";
  ctx.font = "bold 80px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(ZODIAC_GLYPHS[angle / 30], 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return (
    <sprite ref={meshRef} position={[x, y, 0]} scale={[0.4, 0.4, 0.4]}>
      <spriteMaterial map={texture} transparent opacity={0.8} />
    </sprite>
  );
}

function GlowingInnerOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      meshRef.current.scale.setScalar(scale);
      (meshRef.current.material as THREE.Material).opacity = 0.12 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#C9A84C" transparent opacity={0.12} />
    </mesh>
  );
}

function RotatingOuterRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.8, 0.04, 16, 100]} />
      <meshBasicMaterial color="#E8C96A" transparent opacity={0.5} />
    </mesh>
  );
}

function InnerRingLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const positions = new Float32Array(12 * 2 * 3); // 12 lines, 2 points each, 3 coords
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180;
    const x = Math.cos(angle) * 3.8;
    const y = Math.sin(angle) * 3.8;
    // line from center to edge
    positions[i * 6 + 0] = 0;
    positions[i * 6 + 1] = 0;
    positions[i * 6 + 2] = 0;
    positions[i * 6 + 3] = x * 0.6;
    positions[i * 6 + 4] = y * 0.6;
    positions[i * 6 + 5] = 0;
  }

  useFrame((state) => {
    if (linesRef.current) {
      (linesRef.current.material as THREE.LineBasicMaterial).opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2.5) * 0.2;
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#C9A84C" transparent opacity={0.4} />
    </lineSegments>
  );
}

export default function ZodiacWheel() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        style={{ opacity: 0.5, mixBlendMode: "screen" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#C9A84C" />

        {/* Central orb */}
        <GlowingInnerOrb />

        {/* Outer rotating ring */}
        <RotatingOuterRing />

        {/* Inner radial lines */}
        <InnerRingLines />

        {/* Zodiac glyph sprites */}
        {Array.from({ length: 12 }).map((_, i) => (
          <GlyphSprite key={i} angle={i * 30} radius={3.8} />
        ))}
      </Canvas>
    </div>
  );
}
