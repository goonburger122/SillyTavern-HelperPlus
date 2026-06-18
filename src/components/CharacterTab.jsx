import React, { useState } from 'react';

const CharacterTab = ({ characters, activeCharacterId, setActiveCharacterId, addCharacter, updateCharacter, deleteCharacter }) => {
    const [expandedId, setExpandedId] = useState(null);

    return (
        <div>
            <button className="hp-btn-primary" onClick={addCharacter}>+ Create Character</button>
            {characters.length === 0 && <div className="hp-empty">No characters yet. Click the button above to create one.</div>}
            
            {characters.map(c => (
                <div key={c.id} className="hp-card" style={{ border: activeCharacterId === c.id ? '1px solid #c06b6b' : undefined }}>
                    <div className="hp-card-header" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: c.color, marginRight: '10px' }}></div>
                            <span className="hp-card-title">{c.name}</span>
                            {activeCharacterId === c.id && <span className="hp-card-meta" style={{color:'#c06b6b'}}>ACTIVE</span>}
                        </div>
                        <div className="hp-card-actions">
                            {activeCharacterId !== c.id && <button className="hp-btn-sm" onClick={(e) => { e.stopPropagation(); setActiveCharacterId(c.id); }}>Set Active</button>}
                            <button className="hp-btn-sm danger" onClick={(e) => { e.stopPropagation(); deleteCharacter(c.id); }}>Delete</button>
                        </div>
                    </div>
                    
                    {expandedId === c.id && (
                        <div className="hp-card-body">
                            <div className="hp-input-group">
                                <label>Name</label>
                                <input className="hp-input" value={c.name} onChange={(e) => updateCharacter(c.id, 'name', e.target.value)} />
                            </div>
                            <div className="hp-input-group">
                                <label>Color</label>
                                <input type="color" value={c.color} onChange={(e) => updateCharacter(c.id, 'color', e.target.value)} style={{ background: 'none', border: 'none', cursor: 'pointer', height: '40px' }} />
                            </div>
                            <div className="hp-input-group">
                                <label>Description</label>
                                <textarea className="hp-input" value={c.description} onChange={(e) => updateCharacter(c.id, 'description', e.target.value)} placeholder="Who is this character?"></textarea>
                            </div>
                            <div className="hp-input-group">
                                <label>Personality</label>
                                <textarea className="hp-input" value={c.personality} onChange={(e) => updateCharacter(c.id, 'personality', e.target.value)} placeholder="How do they act?"></textarea>
                            </div>
                            <div className="hp-input-group">
                                <label>Scenario</label>
                                <textarea className="hp-input" value={c.scenario} onChange={(e) => updateCharacter(c.id, 'scenario', e.target.value)} placeholder="What is the setting/situation?"></textarea>
                            </div>
                            <div className="hp-input-group">
                                <label>First Message</label>
                                <textarea className="hp-input" value={c.firstMessage} onChange={(e) => updateCharacter(c.id, 'firstMessage', e.target.value)} placeholder="Character's opening line..."></textarea>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CharacterTab;
