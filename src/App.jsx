import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Loader } from '@react-three/drei';
import { Suspense } from 'react';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import './index.css';

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 20, 30], fov: 45 }}
        gl={{ antialias: true, toneMappingExposure: 1.2 }}
        shadows
      >
        <color attach="background" args={['#050810']} />
        <fog attach="fog" args={['#050810', 30, 200]} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={10} damping={0.25} maxSpeed={0.5}>
            <Experience />
            <Scroll html style={{ width: '100%', height: '100%' }}>
              <Overlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader 
        containerStyles={{ background: '#050810' }}
        innerStyles={{ width: '300px', background: 'rgba(255,255,255,0.1)', height: '4px' }}
        barStyles={{ background: '#4ade80', height: '100%' }}
        dataInterpolation={(p) => `Loading Ecosystem ${p.toFixed(0)}%`}
        dataStyles={{ color: '#4ade80', fontSize: '20px', fontFamily: 'Outfit', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}
      />
    </>
  );
}
