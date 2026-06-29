import React from 'react';
import { Code, ExternalLink, Mail, X, Briefcase, MapPin } from 'lucide-react';
import { useStore } from '../store';

export default function Overlay() {
  const activeProject = useStore((state) => state.activeProject);
  const setActiveProject = useStore((state) => state.setActiveProject);

  return (
    <>
      <div className="ui-layer" style={{ pointerEvents: 'none', width: '100vw', position: 'relative' }}>
        
        {/* 1. HERO (0-10%) */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '0', width: '100%' }}>
          <h1 style={{ pointerEvents: 'auto' }}>David</h1>
          <p className="subtitle" style={{ pointerEvents: 'auto' }}>Full-Stack & Mobile Developer</p>
          <p className="breathe" style={{ marginTop: '2rem', color: 'var(--primary)', letterSpacing: '1px' }}>Scroll to explore</p>
        </section>

        {/* 3. ABOUT (25-40%) - Positioned at 300vh roughly */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '250vh', width: '100%' }}>
          <div className="glass-panel" style={{ pointerEvents: 'auto', transform: 'translateX(-20vw)' }}>
            <h2>About me</h2>
            <p>Hi, I'm David, a software developer who enjoys using AI to turn ideas into real products.</p>
            <p>I build modern web and mobile applications with clean design, interactive experiences, and a focus on solving real-world problems.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <span style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'var(--accent)', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid var(--accent)', boxShadow: '0 0 10px rgba(255, 157, 92, 0.2)' }}>React</span>
              <span style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'var(--accent)', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid var(--accent)', boxShadow: '0 0 10px rgba(255, 157, 92, 0.2)' }}>Three.js</span>
              <span style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'var(--accent)', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid var(--accent)', boxShadow: '0 0 10px rgba(255, 157, 92, 0.2)' }}>WebGL</span>
            </div>
          </div>
        </section>

        {/* 4. SKILLS (40-60%) */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '450vh', width: '100%' }}>
          <h2 style={{ pointerEvents: 'auto', fontSize: '4rem', filter: 'drop-shadow(0 0 20px var(--accent))' }}>Ecosystem</h2>
          <p className="subtitle" style={{ pointerEvents: 'auto' }}>Interact with the glowing skill plants!</p>
        </section>

        {/* 5. PROJECTS (60-80%) */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '650vh', width: '100%' }}>
          <div style={{ pointerEvents: 'none', textAlign: 'center' }}>
            <h2 style={{ pointerEvents: 'auto', fontSize: '3rem', filter: 'drop-shadow(0 0 20px var(--primary))' }}>Projects Gallery</h2>
            <p className="subtitle" style={{ pointerEvents: 'auto', color: 'var(--primary)' }}>Click the glowing orbs to view case studies</p>
          </div>
        </section>

        {/* 7. CONTACT (90-100%) */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '900vh', width: '100%' }}>
          <div className="glass-panel" style={{ pointerEvents: 'auto', textAlign: 'center', background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
            <h2 style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 10px var(--accent))' }}>Let's connect</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>Available for freelance opportunities and full-time software development roles.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              <a href="mailto:sovandavid19@gmail.com" className="btn btn-contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', padding: '0.8rem 2rem', width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
                <Mail size={20} /> sovandavid19@gmail.com
              </a>
              <a href="https://github.com/DavidSovan" target="_blank" rel="noreferrer" className="btn btn-contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', padding: '0.8rem 2rem', width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
                <Code size={20} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/%E1%9E%9F%E1%9E%BB%E1%9E%9C%E1%9E%8E%E1%9F%92%E1%9E%8E-%E1%9E%8A%E1%9F%81%E1%9E%9C%E1%9E%B8%E1%9E%8F-834a07324/" target="_blank" rel="noreferrer" className="btn btn-contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', padding: '0.8rem 2rem', width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
                <Briefcase size={20} /> LinkedIn
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <MapPin size={18} /> Cambodia
            </div>
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
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{activeProject.title}</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              {activeProject.description}
            </p>
            
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Technologies</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {activeProject.tech.map((t, idx) => (
                <span key={idx} style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid var(--primary)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" className="btn ghost-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)', background: 'transparent' }}>
                <Code size={18} /> View Source
              </a>
              <a href="#" className="btn primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary)', color: '#000', borderColor: 'var(--primary)' }}>
                <ExternalLink size={18} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
