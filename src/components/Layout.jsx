import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    Settings as SettingsIcon,
    LogOut,
    Search
} from 'lucide-react'

const Layout = ({ session }) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside className="glass" style={{
                width: '260px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10,
                position: 'fixed',
                height: '100vh'
            }}>
                <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'var(--primary)',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <FileText size={18} color="white" />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>NovaNotes</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <MenuLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <MenuLink to="/notes" icon={<FileText size={20} />} label="My Notes" />
                    <MenuLink to="/notes/create" icon={<PlusCircle size={20} />} label="Create New" />
                    <MenuLink to="/settings" icon={<SettingsIcon size={20} />} label="Settings" />
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%',
                            padding: '0.75rem',
                            color: '#ef4444',
                            background: 'transparent',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.9rem',
                            fontWeight: 500
                        }}
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', marginLeft: '260px', maxWidth: 'calc(100% - 260px)', width: '100%' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2.5rem'
                }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }} />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            style={{ width: '100%', paddingLeft: '2.5rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{session.user.email}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pro Account</div>
                        </div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 700,
                            fontSize: '0.9rem'
                        }}>
                            {session.user.email[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    )
}

const MenuLink = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: isActive ? 'white' : 'var(--text-muted)',
                background: isActive ? 'var(--primary)' : 'transparent',
            })}
        >
            {icon}
            {label}
        </NavLink>
    )
}

export default Layout
