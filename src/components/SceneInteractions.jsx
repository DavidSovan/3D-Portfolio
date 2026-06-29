import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';
import { useControls, folder } from 'leva';

// Individual interactive project mesh
function ProjectDisplay({ position, projectData }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  const setActiveProject = useStore((state) => state.setActiveProject);
  
  useCursor(hovered);

  // Smoothly animate scale and emission on hover
  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.2 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      
      // Gentle floating
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    }
    
    if (materialRef.current) {
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.3;
      const targetEmissive = hovered ? 0.8 : breathe;
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity, 
        targetEmissive, 
        delta * 5
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); setActiveProject(projectData); }}
    >
      <octahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="#059669" 
        emissive="#059669"
        emissiveIntensity={0.2}
        wireframe={!hovered}
      />
      {/* Small floating label so users know it's clickable */}
      {hovered && (
        <Html center position={[0, 0.6, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{ background: 'var(--background)', color: '#059669', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', whiteSpace: 'nowrap', border: '1px solid #059669' }}>
            View Project
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Individual interactive skill plant marker
function SkillPlant({ position, skillName }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  const setHoveredSkill = useStore((state) => state.setHoveredSkill);

  useCursor(hovered);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.5 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      meshRef.current.rotation.y += delta * 0.5;
    }
    
    if (materialRef.current) {
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.5;
      const targetOpacity = hovered ? 1.0 : 0.4;
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, delta * 5);
      materialRef.current.emissiveIntensity = hovered ? 0.8 : breathe;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setHovered(true);
        setHoveredSkill(skillName);
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredSkill(null);
      }}
    >
      <icosahedronGeometry args={[0.25, 1]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="#34d399" 
        emissive="#34d399"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
        wireframe
      />
      {hovered && (
        <Html center position={[0, 0.5, 0]} style={{ pointerEvents: 'none', transition: 'all 0.2s' }}>
          <div style={{ background: 'var(--background)', color: '#34d399', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', whiteSpace: 'nowrap', border: '1px solid #34d399', boxShadow: '0 4px 12px rgba(255, 157, 92, 0.2)' }}>
            {skillName}
          </div>
        </Html>
      )}
    </mesh>
  );
}

export default function SceneInteractions() {
  // Debug controls to help user position the interactive markers over their specific 3D model features
  const { p1Pos, p2Pos, s1Pos, s2Pos, s3Pos } = useControls('Interactions', {
    'Projects': folder({
      p1Pos: { value: [2, 4, -5], step: 0.1, label: 'TMDb Project' },
      p2Pos: { value: [4, 4, -7], step: 0.1, label: 'TMS Project' },
    }),
    'Skills': folder({
      s1Pos: { value: [-3, 3, -1], step: 0.1, label: 'React' },
      s2Pos: { value: [-5, 2.5, -2], step: 0.1, label: 'Three.js' },
      s3Pos: { value: [-4, 3.5, 0], step: 0.1, label: 'GSAP' },
    })
  });

  const projects = useMemo(() => [
    {
      id: 'tmdb',
      title: 'TMDb Movie Discovery Application',
      description: 'A comprehensive cinematic discovery engine built with React and TMDb API, featuring dynamic filtering, trailer integration, and personalized watchlists.',
      tech: ['React', 'REST APIs', 'Framer Motion'],
      pos: p1Pos
    },
    {
      id: 'tms',
      title: 'React/Vite Transport Management System',
      description: 'An enterprise logistics dashboard providing real-time fleet tracking, automated route optimization, and detailed analytics reporting.',
      tech: ['React', 'Vite', 'Zustand', 'Tailwind'],
      pos: p2Pos
    }
  ], [p1Pos, p2Pos]);

  const skills = useMemo(() => [
    { name: 'React Ecosystem', pos: s1Pos },
    { name: 'Three.js / WebGL', pos: s2Pos },
    { name: 'GSAP Animation', pos: s3Pos },
  ], [s1Pos, s2Pos, s3Pos]);

  return (
    <group>
      {projects.map((proj) => (
        <ProjectDisplay key={proj.id} position={proj.pos} projectData={proj} />
      ))}
      
      {skills.map((skill, i) => (
        <SkillPlant key={i} position={skill.pos} skillName={skill.name} />
      ))}
    </group>
  );
}
