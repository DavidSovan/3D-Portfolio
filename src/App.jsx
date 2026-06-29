import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Loader } from '@react-three/drei';
import { Leva } from 'leva';
import { Suspense } from 'react';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import './index.css';

export default function App() {
  return (
    <>
      <Leva 
        theme={{ 
          sizes: { rootWidth: '400px' }, 
          fontSizes: { root: '16px' } 
        }} 
      />
      <Canvas
        camera={{ position: [0, 20, 30], fov: 45, near: 0.1 }}
        gl={{ antialias: true, toneMappingExposure: 1.2 }}
        shadows
      >
        <color attach="background" args={['#021a11']} />
        <fog attach="fog" args={['#021a11', 30, 200]} />
        
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
        containerStyles={{ background: '#021a11' }}
        innerStyles={{ width: '300px', background: 'rgba(255,255,255,0.1)', height: '4px' }}
        barStyles={{ background: 'linear-gradient(90deg, #34d399, #059669)', height: '100%', transition: 'width 0.2s ease', animation: 'breathePulse 2.5s ease-in-out infinite' }}
        dataInterpolation={(p) => `Loading Ecosystem ${p.toFixed(0)}%`}
        dataStyles={{ color: 'transparent', fontSize: '20px', fontFamily: 'Outfit', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', backgroundImage: 'linear-gradient(90deg, #34d399, #059669)', WebkitBackgroundClip: 'text', animation: 'breathePulse 2.5s ease-in-out infinite' }}
      />
    </>
  );
}
