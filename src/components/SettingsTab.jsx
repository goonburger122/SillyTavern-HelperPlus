import React from 'react';

const SettingsTab = ({ personas, characters, setPersonas, setCharacters }) => {
    
    const exportData = () => {
        const data = { personas, characters };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'helper_plus_backup.json'; a.click();
    };

    const importData = () => {
        const input = document.createElement('input');
        input.type = 'file'; input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const json = JSON.parse(ev.target.result);
                    if (json.personas) setPersonas(json.personas);
                    if (json.characters) setCharacters(json.characters);
                    alert('Data imported successfully!');
                } catch (err) {
                    alert('Invalid JSON file.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    return (
        <div>
            <h3 style={{ marginTop: 0, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Data Management</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>Export or Import your Persona and Character data. This does not affect your SillyTavern base settings.</p>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <button className="hp-btn-primary" onClick={exportData}>Export JSON</button>
                <button className="hp-btn-primary" style={{ background: '#444' }} onClick={importData}>Import JSON</button>
            </div>

            <div className="hp-card" style={{ borderColor: 'rgba(220,50,50,0.4)' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#dc3232' }}>Danger Zone</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 12px 0' }}>Permanently delete all Helper+ data from your browser storage.</p>
                <button className="hp-btn-sm danger" style={{ padding: '8px 16px' }} onClick={() => {
                    if (confirm('Are you sure you want to delete ALL personas and characters?')) {
                        setPersonas([]); setCharacters([]);
                    }
                }}>Wipe All Data</button>
            </div>
        </div>
    );
};

export default SettingsTab;
