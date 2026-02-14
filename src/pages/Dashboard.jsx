import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { FileText, Clock, Star, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, recent: 0, favorites: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            const { data, count } = await supabase
                .from('notes')
                .select('*', { count: 'exact' })

            const recentThreshold = new Date()
            recentThreshold.setDate(recentThreshold.getDate() - 7)

            const recent = data?.filter(n => new Date(n.created_at) > recentThreshold).length || 0

            setStats({
                total: count || 0,
                recent: recent,
                favorites: 0 // Feature not implemented yet
            })
        }
        fetchStats()
    }, [])

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome back!</h1>
                <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your notes today.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <StatCard icon={<FileText color="#6366f1" />} label="Total Notes" value={stats.total} color="#6366f1" />
                <StatCard icon={<Clock color="#10b981" />} label="Recent Edits" value={stats.recent} color="#10b981" />
                <StatCard icon={<Star color="#f59e0b" />} label="Favorites" value={stats.favorites} color="#f59e0b" />
                <StatCard icon={<Zap color="#8b5cf6" />} label="Next Goal" value="50 Notes" color="#8b5cf6" />
            </div>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Quick Actions</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <ActionCard
                        title="Create New Note"
                        desc="Capture a thought or attach a file quickly."
                        buttonText="Create Now"
                        path="/notes/create"
                    />
                    <ActionCard
                        title="Manage Storage"
                        desc="You've used 12% of your 5GB storage."
                        buttonText="View Settings"
                        path="/settings"
                    />
                </div>
            </section>
        </div>
    )
}

const StatCard = ({ icon, label, value, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass"
        style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${color}20`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {icon}
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{label}</span>
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{value}</div>
    </motion.div>
)

const ActionCard = ({ title, desc, buttonText, path }) => (
    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{desc}</p>
        <button
            style={{
                marginTop: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 'var(--radius-sm)',
                width: 'fit-content',
                fontWeight: 600,
                fontSize: '0.9rem'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
        >
            {buttonText}
        </button>
    </div>
)

export default Dashboard
