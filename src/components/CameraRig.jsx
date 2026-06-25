import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useControls, folder } from 'leva';
import gsap from 'gsap';

export default function CameraRig({ modelDimensions }) {
  const { camera, pointer } = useThree();
  const scroll = useScroll();

  // --- LEVA DEBUG CONTROLS ---
  const { debugMode, showPath } = useControls('Camera Rig', {
    debugMode: { value: true, label: 'Enable Debug Mode' },
    showPath: { value: true, label: 'Show Camera Path' },
  });

  const {
    wp1Pos, wp1Look,
    wp2Pos, wp2Look,
    wp3Pos, wp3Look,
    wp4Pos, wp4Look,
    parallaxStrength,
    verticalFramingOffset
  } = useControls('Waypoints', {
    'WP 1: Global Exterior': folder({
      wp1Pos: { value: { x: 18, y: 12, z: 18 }, step: 0.1 },
      wp1Look: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
    }),
    'WP 2: Botany Table': folder({
      wp2Pos: { value: { x: -8, y: 6, z: 5 }, step: 0.1 },
      wp2Look: { value: { x: -5, y: 3, z: 0 }, step: 0.1 },
    }),
    'WP 3: The Pond': folder({
      wp3Pos: { value: { x: 8, y: 5, z: -2 }, step: 0.1 },
      wp3Look: { value: { x: 0, y: 2, z: -5 }, step: 0.1 },
    }),
    'WP 4: Mangrove Tree': folder({
      wp4Pos: { value: { x: 0, y: 2, z: -15 }, step: 0.1 },
      wp4Look: { value: { x: 0, y: 5, z: -20 }, step: 0.1 },
    }),
    parallaxStrength: { value: 0.5, min: 0, max: 2, step: 0.1 },
    verticalFramingOffset: { value: -2.5, min: -5, max: 5, step: 0.1, label: 'Vertical Framing (LookAt Y)' },
  });

  // --- CURVES & TARGETS ---
  const { positionCurve, lookAtCurve, debugPoints } = useMemo(() => {
    // 1. Camera Position Spline
    const posCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(wp1Pos.x, wp1Pos.y, wp1Pos.z),
      new THREE.Vector3(wp2Pos.x, wp2Pos.y, wp2Pos.z),
      new THREE.Vector3(wp3Pos.x, wp3Pos.y, wp3Pos.z),
      new THREE.Vector3(wp4Pos.x, wp4Pos.y, wp4Pos.z),
    ]);
    posCurve.curveType = 'catmullrom';
    posCurve.tension = 0.5;

    // 2. LookAt Target Spline (ensures smooth panning)
    const lookCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(wp1Look.x, wp1Look.y, wp1Look.z),
      new THREE.Vector3(wp2Look.x, wp2Look.y, wp2Look.z),
      new THREE.Vector3(wp3Look.x, wp3Look.y, wp3Look.z),
      new THREE.Vector3(wp4Look.x, wp4Look.y, wp4Look.z),
    ]);
    lookCurve.curveType = 'catmullrom';
    lookCurve.tension = 0.5;

    // Generate points for the debug visualizer
    const points = posCurve.getPoints(50);
    return { positionCurve: posCurve, lookAtCurve: lookCurve, debugPoints: points };
  }, [wp1Pos, wp2Pos, wp3Pos, wp4Pos, wp1Look, wp2Look, wp3Look, wp4Look]);

  // Reusable vectors for the frame loop to avoid garbage collection stutters
  const currentPos = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);
  const parallaxOffset = useMemo(() => new THREE.Vector3(), []);
  const smoothedPointer = useMemo(() => new THREE.Vector2(), []);

  // --- RENDER LOOP ---
  useFrame((state, delta) => {
    // 1. Get Scroll Progress (0 to 1)
    // Add a slight ease using GSAP utility or lerp if we want, but ScrollTrigger scrub handles it via Drei's useScroll.
    // Drei's scroll.offset is already scrubbed/smoothed based on <ScrollControls damping={0.25}>.
    const progress = Math.max(0, Math.min(1, scroll.offset));

    // 2. Sample the curves
    positionCurve.getPoint(progress, currentPos);
    lookAtCurve.getPoint(progress, currentLookAt);

    // Apply the framing offset (mainly affects the initial view)
    // We blend it out as progress increases so the camera returns to its intended interior targets
    const blendedOffset = verticalFramingOffset * (1 - progress);
    currentLookAt.y += blendedOffset;

    // 3. Calculate Mouse Parallax
    // Smooth the pointer coordinates using damp/lerp to avoid jerky mouse movements
    THREE.MathUtils.damp(smoothedPointer.x, pointer.x, 4, delta);
    THREE.MathUtils.damp(smoothedPointer.y, pointer.y, 4, delta);

    // Calculate parallax offsets based on smoothed pointer
    parallaxOffset.set(
      smoothedPointer.x * parallaxStrength,
      smoothedPointer.y * parallaxStrength,
      0
    );

    // Transform the parallax offset so it applies relative to the camera's local view space, not global world space
    parallaxOffset.applyQuaternion(camera.quaternion);

    // 4. Apply to Camera
    // Final position = Spline position + Parallax offset
    camera.position.copy(currentPos).add(parallaxOffset);
    camera.lookAt(currentLookAt);
  });

  // --- DEBUG VISUALS ---
  if (!debugMode) return null;

  return (
    <group>
      {/* Draw the Camera Path */}
      {showPath && (
        <mesh>
          <tubeGeometry args={[positionCurve, 64, 0.05, 8, false]} />
          <meshBasicMaterial color="hotpink" wireframe />
        </mesh>
      )}

      {/* Draw LookAt Targets */}
      {[wp1Look, wp2Look, wp3Look, wp4Look].map((look, i) => (
        <mesh key={`look-${i}`} position={[look.x, look.y, look.z]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="cyan" wireframe />
        </mesh>
      ))}

      {/* Draw Position Waypoints */}
      {[wp1Pos, wp2Pos, wp3Pos, wp4Pos].map((pos, i) => (
        <mesh key={`pos-${i}`} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="yellow" wireframe />
        </mesh>
      ))}
    </group>
  );
}
