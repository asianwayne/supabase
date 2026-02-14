import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { User, Shield, Bell, HardDrive, Save } from 'lucide-react'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile')

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Account Settings</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage your workspace and security preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
                {/* Settings Navigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <SettingsNavLink
                        active={activeTab === 'profile'}
                        onClick={() => setActiveTab('profile')}
                        icon={<User size={18} />}
                        label="Profile"
                    />
                    <SettingsNavLink
                        active={activeTab === 'security'}
                        onClick={() => setActiveTab('security')}
                        icon={<Shield size={18} />}
                        label="Security"
                    />
                    <SettingsNavLink
                        active={activeTab === 'notifications'}
                        onClick={() => setActiveTab('notifications')}
                        icon={<Bell size={18} />}
                        label="Notifications"
                    />
                    <SettingsNavLink
                        active={activeTab === 'storage'}
                        onClick={() => setActiveTab('storage')}
                        icon={<HardDrive size={18} />}
                        label="Storage"
                    />
                </div>

                {/* Settings Content */}
                <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                    {activeTab === 'profile' && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>Profile Information</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
                                        <input type="text" defaultValue="John Doe" style={{ width: '100%' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Username</label>
                                        <input type="text" defaultValue="johndoe_dev" style={{ width: '100%' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
                                    <input type="email" defaultValue="john@example.com" disabled style={{ width: '100%', opacity: 0.6 }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Bio</label>
                                    <textarea defaultValue="Building cool things with React and Supabase." style={{ width: '100%', minHeight: '100px' }} />
                                </div>
                                <button style={{
                                    marginTop: '1rem',
                                    padding: '0.75rem 1.5rem',
                                    background: 'var(--primary)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontWeight: 600,
                                    width: 'fit-content',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'profile' && (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>This section is under construction.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const SettingsNavLink = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            background: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
            color: active ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 500,
            fontSize: '0.95rem',
            textAlign: 'left'
        }}
    >
        {icon}
        {label}
    </button>
)

export default Settings
