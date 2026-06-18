import React, { useState } from 'react';

const PersonaTab = ({ personas, activePersonaId, setActivePersonaId, addPersona, updatePersona, deletePersona }) => {
    const [expandedId, setExpandedId] = useState(null);

    return (
        <div>
            <button className="hp-btn-primary" onClick={addPersona}>+ Create Persona</button>
            {personas.length === 0 && <div className="hp-empty">No personas yet. Click the button above to create one.</div>}
            
            {personas.map(p => (
                <div key={p.id} className="hp-card" style={{ border: activePersonaId === p.id ? '1px solid #6b65c0' : undefined }}>
                    <div className="hp-card-header" onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.color, marginRight: '10px' }}></div>
                            <span className="hp-card-title">{p.name}</span>
                            {activePersonaId === p.id && <span className="hp-card-meta">ACTIVE</span>}
                        </div>
                        <div className="hp-card-actions">
                            {activePersonaId !== p.id && <button className="hp-btn-sm" onClick={(e) => { e.stopPropagation(); setActivePersonaId(p.id); }}>Set Active</button>}
                            <button className="hp-btn-sm danger" onClick={(e) => { e.stopPropagation(); deletePersona(p.id); }}>Delete</button>
                        </div>
                    </div>
                    
                    {expandedId === p.id && (
                        <div className="hp-card-body">
                            <div className="hp-input-group">
                                <label>Name</label>
                                <input className="hp-input" value={p.name} onChange={(e) => updatePersona(p.id, 'name', e.target.value)} />
                            </div>
                            <div className="hp-input-group">
                                <label>Color</label>
                                <input type="color" value={p.color} onChange={(e) => updatePersona(p.id, 'color', e.target.value)} style={{ background: 'none', border: 'none', cursor: 'pointer', height: '40px' }} />
                            </div>
                            <div className="hp-input-group">
                                <label>Description</label>
                                <textarea className="hp-input" value={p.description} onChange={(e) => updatePersona(p.id, 'description', e.target.value)} placeholder="Who is this persona?"></textarea>
                            </div>
                            <div className="hp-input-group">
                                <label>Personality</label>
                                <textarea className="hp-input" value={p.personality} onChange={(e) => updatePersona(p.id, 'personality', e.target.value)} placeholder="How do they act?"></textarea>
                            </div>
                            <div className="hp-input-group">
                                <label>Speech Patterns</label>
                                <textarea className="hp-input" value={p.speech} onChange={(e) => updatePersona(p.id, 'speech', e.target.value)} placeholder="How do they talk?"></textarea>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PersonaTab;
