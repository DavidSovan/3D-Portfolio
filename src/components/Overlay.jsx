import React from 'react';
import { Code, ExternalLink, Mail, X } from 'lucide-react';
import { useStore } from '../store';

export default function Overlay() {
  const activeProject = useStore((state) => state.activeProject);
  const setActiveProject = useStore((state) => state.setActiveProject);

  return (
    <>
      <div className="ui-layer" style={{ pointerEvents: 'none', width: '100vw', position: 'relative' }}>
        
        {/* 1. HERO (0-10%) */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '0', width: '100%' }}>
          <h1 style={{ pointerEvents: 'auto' }}>John Doe</h1>
          <p className="subtitle" style={{ pointerEvents: 'auto' }}>Creative Front-End Engineer</p>
          <p style={{ marginTop: '2rem', color: '#94a3b8', letterSpacing: '1px', opacity: 0.6 }}>Scroll to explore</p>
        </section>

        {/* 3. ABOUT (25-40%) - Positioned at 300vh roughly */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '250vh', width: '100%' }}>
          <div className="glass-panel" style={{ pointerEvents: 'auto', transform: 'translateX(-20vw)' }}>
            <h2>Initialize Sequence</h2>
            <p>Hi, I'm John. I build immersive, interactive experiences on the web.</p>
            <p>My work blends technical engineering with creative design to push the boundaries of what a browser can do.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <span style={{ padding: '0.5rem 1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '20px', fontSize: '0.9rem' }}>React</span>
              <span style={{ padding: '0.5rem 1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '20px', fontSize: '0.9rem' }}>Three.js</span>
              <span style={{ padding: '0.5rem 1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '20px', fontSize: '0.9rem' }}>WebGL</span>
            </div>
          </div>
        </section>

        {/* 4. SKILLS (40-60%) */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '450vh', width: '100%' }}>
          <h2 style={{ pointerEvents: 'auto', fontSize: '4rem', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }}>Ecosystem</h2>
          <p className="subtitle" style={{ pointerEvents: 'auto' }}>Interact with the glowing skill plants!</p>
        </section>

        {/* 5. PROJECTS (60-80%) */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '650vh', width: '100%' }}>
          <div style={{ pointerEvents: 'none', textAlign: 'center' }}>
            <h2 style={{ pointerEvents: 'auto', fontSize: '3rem', filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.5))' }}>Projects Gallery</h2>
            <p className="subtitle" style={{ pointerEvents: 'auto' }}>Click the blue glowing orbs to view case studies</p>
          </div>
        </section>

        {/* 7. CONTACT (90-100%) */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '900vh', width: '100%' }}>
          <div className="glass-panel" style={{ pointerEvents: 'auto', textAlign: 'center', background: 'rgba(5, 8, 16, 0.8)' }}>
            <h2 style={{ color: '#a3e635' }}>Let's connect</h2>
            <p>Ready to plant the seeds for a new project?</p>
            <a href="mailto:hello@example.com" className="btn" style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', padding: '1rem 3rem' }}>
              <Mail /> hello@example.com
            </a>
          </div>
        </section>

      </div>

      {/* --- FULLSCREEN PROJECT MODAL --- */}
      {activeProject && (
        <div className="modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)}>
              <X size={24} />
            </button>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem' }}>{activeProject.title}</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', color: '#cbd5e1' }}>
              {activeProject.description}
            </p>
            
            <h4 style={{ marginBottom: '1rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Technologies</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {activeProject.tech.map((t, idx) => (
                <span key={idx} style={{ padding: '0.5rem 1rem', background: 'rgba(96, 165, 250, 0.1)', color: '#60a5fa', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: '#60a5fa', color: '#60a5fa' }}>
                <Code size={18} /> View Source
              </a>
              <a href="#" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#60a5fa', color: '#000' }}>
                <ExternalLink size={18} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
