import { Environment, Center } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

import { Model } from './Model';
import Particles from './Particles';
import CameraRig from './CameraRig';
import SceneInteractions from './SceneInteractions';

export default function Experience() {
  const { scene } = useThree();
  const dirLight = useRef();
  const ambLight = useRef();

  const { modelRotationY } = useControls('Model Adjustment', {
    modelRotationY: { value: -Math.PI / 4, min: -Math.PI, max: Math.PI, step: 0.01 }
  });

  // Model normalization
  const handleCentered = useCallback(({ container, width, height, depth }) => {
    // Scale model so largest axis = 20 units
    const maxDim = Math.max(width, height, depth);
    const s = 20 / maxDim;
    container.scale.set(s, s, s);
    
    // We keep fog setup here to ensure it's applied correctly
    if (scene.fog) {
      scene.fog.near = 10;
      scene.fog.far = 100;
    }
  }, [scene]);

  // Subtle lighting animation independent of scroll
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (dirLight.current) {
      dirLight.current.intensity = 1.5 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <>
      <CameraRig />

      {/* ── Lighting ── */}
      <ambientLight ref={ambLight} intensity={0.6} color="#ffffff" />
      <directionalLight
        ref={dirLight}
        position={[15, 30, 20]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        color="#ffecd1"
      />
      {/* Cool accent fill from below/behind for contact section */}
      <pointLight position={[0, -5, -25]} intensity={0.6} color="#4488ff" distance={50} />
      {/* Warm rim light from the front-right */}
      <pointLight position={[15, 8, 15]} intensity={0.4} color="#ffcc88" distance={50} />

      {/* ── Interactive Elements ── */}
      <SceneInteractions />

      {/* ── Model (fixed, never moves) ── */}
      <Center onCentered={handleCentered}>
        <group rotation={[0, modelRotationY, 0]}>
          <Model />
        </group>
      </Center>

      {/* ── Environmental Effects ── */}
      <Particles />

      {/* ── Reflective water plane ── */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial
          color="#020510"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* ── HDR Environment ── */}
      <Environment preset="city" />
    </>
  );
}
