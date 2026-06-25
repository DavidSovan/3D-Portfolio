import { Sparkles } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * Three particle zones matching the camera journey:
 *   Front  — warm golden dust (Hero / Approach)
 *   Center — green pollen spores (Interior / Skills)
 *   Back   — blue bioluminescent fireflies (Roots / Contact)
 *
 * Each zone slowly drifts via a rotating wrapper.
 * An additional "fairy light" point light orbits the center
 * to add subtle animated caustics.
 */
export default function Particles() {
  const wrapper = useRef();
  const orbLight = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (wrapper.current) {
      wrapper.current.rotation.y = t * 0.015;
    }
    // Orbiting accent light inside greenhouse
    if (orbLight.current) {
      orbLight.current.position.x = Math.sin(t * 0.3) * 6;
      orbLight.current.position.z = Math.cos(t * 0.3) * 6;
      orbLight.current.position.y = 4 + Math.sin(t * 0.5) * 1.5;
      orbLight.current.intensity = 0.15 + Math.sin(t * 0.8) * 0.08;
    }
  });

  return (
    <group ref={wrapper}>
      {/* ── Warm golden dust — Hero / Approach zone ── */}
      <Sparkles
        count={200}
        scale={[35, 25, 25]}
        position={[0, 10, 18]}
        size={1.8}
        speed={0.2}
        opacity={0.2}
        color="#ffe5b4"
      />

      {/* ── Green pollen — Interior greenhouse ── */}
      <Sparkles
        count={300}
        scale={[22, 14, 22]}
        position={[0, 5, 0]}
        size={2.5}
        speed={0.2}
        opacity={0.3}
        color="#a3e635"
      />

      {/* ── Bioluminescent fireflies — Back / Roots / Contact ── */}
      <Sparkles
        count={400}
        scale={[30, 16, 22]}
        position={[0, 3, -18]}
        size={3.5}
        speed={0.35}
        opacity={0.65}
        color="#60a5fa"
        noise={1.5}
      />

      {/* ── Faint floating embers throughout ── */}
      <Sparkles
        count={100}
        scale={[50, 30, 50]}
        position={[0, 8, 0]}
        size={1}
        speed={0.1}
        opacity={0.08}
        color="#ffffff"
      />

      {/* ── Orbiting accent light for interior caustics ── */}
      <pointLight
        ref={orbLight}
        position={[0, 5, 0]}
        intensity={0.15}
        color="#88ffaa"
        distance={20}
      />
    </group>
  );
}
