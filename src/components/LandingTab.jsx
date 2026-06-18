import React from 'react';

const LandingTab = ({ personas, characters, activePersonaId, activeCharacterId, switchTab }) => {
    const activePersona = personas.find(p => p.id === activePersonaId);
    const activeCharacter = characters.find(c => c.id === activeCharacterId);

    return (
        <div>
            <h3 style={{ marginTop: 0, color: '#fff' }}>Dashboard</h3>
            <div className="hp-stat-grid">
                <div className="hp-stat-card">
                    <div className="hp-stat-value">{personas.length}</div>
                    <div className="hp-stat-label">Personas</div>
                </div>
                <div className="hp-stat-card">
                    <div className="hp-stat-value">{characters.length}</div>
                    <div className="hp-stat-label">Characters</div>
                </div>
            </div>

            <div className="hp-card" style={{ cursor: 'pointer' }} onClick={() => switchTab('personas')}>
                <div className="hp-card-header">
                    <div><strong>Active Persona:</strong> <span className="hp-card-meta">{activePersona ? activePersona.name : 'None Selected'}</span></div>
                    <span className="hp-btn-sm">Manage</span>
                </div>
                {activePersona && <div style={{ marginTop: '10px', color: '#aaa', fontSize: '0.9rem' }}>{activePersona.description || 'No description'}</div>}
            </div>

            <div className="hp-card" style={{ cursor: 'pointer' }} onClick={() => switchTab('characters')}>
                <div className="hp-card-header">
                    <div><strong>Active Character:</strong> <span className="hp-card-meta">{activeCharacter ? activeCharacter.name : 'None Selected'}</span></div>
                    <span className="hp-btn-sm">Manage</span>
                </div>
                {activeCharacter && <div style={{ marginTop: '10px', color: '#aaa', fontSize: '0.9rem' }}>{activeCharacter.description || 'No description'}</div>}
            </div>
        </div>
    );
};

export default LandingTab;
