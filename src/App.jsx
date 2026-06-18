import React, { useState, useEffect } from 'react';
import DrawerPanel from './components/DrawerPanel';
import LandingTab from './components/LandingTab';
import PersonaTab from './components/PersonaTab';
import CharacterTab from './components/CharacterTab';
import SettingsTab from './components/SettingsTab';

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('landing');
    
    const [personas, setPersonas] = useState(() => {
        const saved = localStorage.getItem('hp_personas');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [characters, setCharacters] = useState(() => {
        const saved = localStorage.getItem('hp_characters');
        return saved ? JSON.parse(saved) : [];
    });

    const [activePersonaId, setActivePersonaId] = useState(() => localStorage.getItem('hp_active_persona') || null);
    const [activeCharacterId, setActiveCharacterId] = useState(() => localStorage.getItem('hp_active_character') || null);

    useEffect(() => {
        localStorage.setItem('hp_personas', JSON.stringify(personas));
    }, [personas]);

    useEffect(() => {
        localStorage.setItem('hp_characters', JSON.stringify(characters));
    }, [characters]);

    useEffect(() => {
        localStorage.setItem('hp_active_persona', activePersonaId || '');
    }, [activePersonaId]);

    useEffect(() => {
        localStorage.setItem('hp_active_character', activeCharacterId || '');
    }, [activeCharacterId]);

    useEffect(() => {
        const btn = document.createElement('div');
        btn.id = 'hp-toggle';
        btn.innerHTML = 'H+'; 
        btn.style.cssText = 'cursor:pointer; padding:5px 10px; background:rgba(107,101,192,0.3); border:1px solid rgba(107,101,192,0.5); border-radius:5px; color:#fff; font-weight:bold; margin-left:5px;';
        btn.onclick = () => setIsOpen(!isOpen);
        
        const topBar = document.getElementById('top-bar');
        if(topBar) topBar.appendChild(btn);
    }, []);

    const addPersona = () => {
        const newPersona = { id: generateId(), name: 'New Persona', description: '', personality: '', speech: '', color: '#6b65c0' };
        setPersonas([...personas, newPersona]);
        setActivePersonaId(newPersona.id);
    };

    const updatePersona = (id, key, value) => {
        setPersonas(personas.map(p => p.id === id ? { ...p, [key]: value } : p));
    };

    const deletePersona = (id) => {
        setPersonas(personas.filter(p => p.id !== id));
        if (activePersonaId === id) setActivePersonaId(null);
    };

    const addCharacter = () => {
        const newChar = { id: generateId(), name: 'New Character', description: '', personality: '', scenario: '', firstMessage: '', color: '#c06b6b' };
        setCharacters([...characters, newChar]);
        setActiveCharacterId(newChar.id);
    };

    const updateCharacter = (id, key, value) => {
        setCharacters(characters.map(c => c.id === id ? { ...c, [key]: value } : c));
    };

    const deleteCharacter = (id) => {
        setCharacters(characters.filter(c => c.id !== id));
        if (activeCharacterId === id) setActiveCharacterId(null);
    };

    return (
        <DrawerPanel isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                <div className="hp-header">
                    <h2>Helper<span>+</span></h2>
                    <button className="hp-close-btn" onClick={() => setIsOpen(false)}>✕</button>
                </div>
                
                <div className="hp-tabs">
                    {['landing', 'personas', 'characters', 'settings'].map(tab => (
                        <button key={tab} className={`hp-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                            {tab === 'landing' ? 'Home' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="hp-content">
                    {activeTab === 'landing' && <LandingTab personas={personas} characters={characters} activePersonaId={activePersonaId} activeCharacterId={activeCharacterId} switchTab={setActiveTab} />}
                    {activeTab === 'personas' && <PersonaTab personas={personas} activePersonaId={activePersonaId} setActivePersonaId={setActivePersonaId} addPersona={addPersona} updatePersona={updatePersona} deletePersona={deletePersona} />}
                    {activeTab === 'characters' && <CharacterTab characters={characters} activeCharacterId={activeCharacterId} setActiveCharacterId={setActiveCharacterId} addCharacter={addCharacter} updateCharacter={updateCharacter} deleteCharacter={deleteCharacter} />}
                    {activeTab === 'settings' && <SettingsTab personas={personas} characters={characters} setPersonas={setPersonas} setCharacters={setCharacters} />}
                </div>
            </div>
        </DrawerPanel>
    );
};

export default App;
