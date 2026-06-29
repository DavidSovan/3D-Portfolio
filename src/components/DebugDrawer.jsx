import React, { useState } from 'react';
import { Leva } from 'leva';
import { Settings, X } from 'lucide-react';

export default function DebugDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="debug-toggle-btn"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 100,
          background: 'var(--surface)',
          border: '1px solid var(--primary)',
          color: 'var(--primary)',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(5, 150, 105, 0.3)',
        }}
      >
        <Settings size={24} />
      </button>

      <div 
        className={`debug-drawer ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-400px',
          width: '350px',
          maxWidth: '100vw',
          height: '100vh',
          background: '#181c20', // Matches Leva dark theme roughly
          boxShadow: isOpen ? '-5px 0 30px rgba(0,0,0,0.5)' : 'none',
          transition: 'right 0.3s ease',
          zIndex: 1000,
          overflowY: 'auto',
          borderLeft: '1px solid var(--surface-border)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '15px 20px',
          borderBottom: '1px solid #3f3f46'
        }}>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontFamily: 'Outfit' }}>Debug Controls</h3>
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#a1a1aa',
              cursor: 'pointer',
              display: 'flex'
            }}
          >
            <X size={24} />
          </button>
        </div>
        
        <div style={{ position: 'relative', padding: '10px' }}>
          <Leva 
            fill 
            theme={{ 
              sizes: { rootWidth: '100%' }, 
              fontSizes: { root: '14px' },
              colors: {
                elevation1: '#181c20',
                elevation2: '#272b30',
                elevation3: '#3f3f46',
              }
            }} 
          />
        </div>
      </div>
    </>
  );
}
