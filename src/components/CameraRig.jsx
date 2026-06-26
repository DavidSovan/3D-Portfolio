import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useControls, folder } from 'leva';

export default function CameraRig() {
  const { camera, pointer } = useThree();
  const scroll = useScroll();

  // --- LEVA DEBUG CONTROLS ---
  const { debugMode, showPath } = useControls('Camera Rig', {
    debugMode: { value: false, label: 'Enable Debug Mode' },
    showPath: { value: false, label: 'Show Camera Path' },
  });

  const {
    wp1Pos, wp1Look,
    wp2Pos, wp2Look,
    wp3Pos, wp3Look,
    wp4Pos, wp4Look,
    wp5Pos, wp5Look,
    parallaxStrength,
    verticalFramingOffset
  } = useControls('Waypoints', {
    'WP 1: Exterior (0%)': folder({
      wp1Pos: { value: { x: 19, y: 4.5, z: 18 }, step: 0.1 },
      wp1Look: { value: { x: 0, y: 0.5, z: 0 }, step: 0.1 },
    }),
    'WP 2: Botany Table (25%)': folder({
      wp2Pos: { value: { x: -2, y: -0.5, z: 3 }, step: 0.1 },
      wp2Look: { value: { x: -9, y: -3, z: 13 }, step: 0.1 },
    }),
    'WP 3: The Pond (50%)': folder({
      wp3Pos: { value: { x: 2, y: -0.5, z: 3 }, step: 0.1 },
      wp3Look: { value: { x: 1, y: -1.5, z: -13 }, step: 0.1 },
    }),
    'WP 4: Mangrove Tree (75%)': folder({
      wp4Pos: { value: { x: 0, y: 2.5, z: -17 }, step: 0.1 },
      wp4Look: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
    }),
    'WP 5: Exterior (100%)': folder({
      wp5Pos: { value: { x: 18, y: 4.5, z: 18 }, step: 0.1 },
      wp5Look: { value: { x: 0, y: 0.5, z: 0 }, step: 0.1 },
    }),
    parallaxStrength: { value: 0.6, min: 0, max: 2, step: 0.1 },
    verticalFramingOffset: { value: 1.2, min: -5, max: 5, step: 0.1, label: 'Vertical Framing (LookAt Y)' },
  });

  // --- CURVES & TARGETS ---
  const { positionCurve, lookAtCurve } = useMemo(() => {
    const posCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(wp1Pos.x, wp1Pos.y, wp1Pos.z),
      new THREE.Vector3(wp2Pos.x, wp2Pos.y, wp2Pos.z),
      new THREE.Vector3(wp3Pos.x, wp3Pos.y, wp3Pos.z),
      new THREE.Vector3(wp4Pos.x, wp4Pos.y, wp4Pos.z),
      new THREE.Vector3(wp5Pos.x, wp5Pos.y, wp5Pos.z),
    ]);
    posCurve.curveType = 'catmullrom';
    posCurve.tension = 0.5;

    const lookCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(wp1Look.x, wp1Look.y, wp1Look.z),
      new THREE.Vector3(wp2Look.x, wp2Look.y, wp2Look.z),
      new THREE.Vector3(wp3Look.x, wp3Look.y, wp3Look.z),
      new THREE.Vector3(wp4Look.x, wp4Look.y, wp4Look.z),
      new THREE.Vector3(wp5Look.x, wp5Look.y, wp5Look.z),
    ]);
    lookCurve.curveType = 'catmullrom';
    lookCurve.tension = 0.5;

    return { positionCurve: posCurve, lookAtCurve: lookCurve };
  }, [wp1Pos, wp2Pos, wp3Pos, wp4Pos, wp5Pos, wp1Look, wp2Look, wp3Look, wp4Look, wp5Look]);

  // Use a ref for the active camera state
  const currentPos = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);

  // Update camera on every frame based on scroll progress
  useFrame((state) => {
    const progress = Math.max(0, Math.min(1, scroll.offset));

    positionCurve.getPoint(progress, currentPos);
    lookAtCurve.getPoint(progress, currentLookAt);

    const activeOffset = verticalFramingOffset * (1 - progress);
    currentLookAt.y -= activeOffset;

    const parallaxX = state.pointer.x * parallaxStrength;
    const parallaxY = state.pointer.y * parallaxStrength;

    state.camera.position.lerp(
      new THREE.Vector3(currentPos.x + parallaxX, currentPos.y + parallaxY, currentPos.z),
      0.1
    );

    state.camera.lookAt(currentLookAt);
  });

  if (!debugMode && !showPath) return null;

  return (
    <group>
      {showPath && (
        <mesh>
          <tubeGeometry args={[positionCurve, 100, 0.05, 8, false]} />
          <meshBasicMaterial color="#ff0055" wireframe />
        </mesh>
      )}

      {debugMode && (
        <group>
          {[wp1Look, wp2Look, wp3Look, wp4Look, wp5Look].map((look, i) => (
            <mesh key={`look-${i}`} position={[look.x, look.y, look.z]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="#00aaff" wireframe />
            </mesh>
          ))}

          {[wp1Pos, wp2Pos, wp3Pos, wp4Pos, wp5Pos].map((pos, i) => (
            <mesh key={`pos-${i}`} position={[pos.x, pos.y, pos.z]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color="#ffff00" wireframe />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
