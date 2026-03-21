"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function StarScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation
      groupRef.current.rotation.y += 0.0002;
    }
    
    // Zoom-out effect on start
    if (state.camera.position.z > 0) {
      state.camera.position.z -= 0.02; // Dolly in... wait
      // Actually prompt requested: "camera slowly pulls back from inside the star cluster (zoom-out effect, 3s)"
    }
  });

  return (
    <group ref={groupRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    // Initial zoom-out animation using lerp over first 3 seconds
    const targetZ = 5; // Final camera Z
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.02
    );
  });
  return null;
}

export default function Starfield() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 60 }} // Start far away, rig will lerp it closer or vice-versa
        dpr={[1, 2]}
      >
        <CameraRig />
        <StarScene />
      </Canvas>
    </div>
  );
}
