import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { FileText, Calendar, Paperclip, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const NotesList = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchNotes = async () => {
        try {
            const { data, error } = await supabase
                .from('notes')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setNotes(data || [])
        } catch (error) {
            console.error('Error fetching notes:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this note?')) return

        try {
            const { error } = await supabase
                .from('notes')
                .delete()
                .eq('id', id)

            if (error) throw error
            setNotes(notes.filter(note => note.id !== id))
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>My Notes</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>You have {notes.length} notes saved.</p>
                </div>
                <button
                    onClick={() => navigate('/notes/create')}
                    style={{
                        background: 'var(--primary)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 600
                    }}
                >
                    New Note
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <AnimatePresence>
                    {loading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="glass" style={{ height: '180px', borderRadius: 'var(--radius-md)', opacity: 0.5 }}></div>
                        ))
                    ) : notes.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                            No notes found. Create your first one!
                        </div>
                    ) : (
                        notes.map((note) => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                className="glass"
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    position: 'relative',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <FileText size={16} />
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                                        style={{ background: 'transparent', color: '#ef4444' }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{note.title}</h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.875rem',
                                    marginBottom: '1.5rem',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>{note.content}</p>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--border)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        <Calendar size={12} />
                                        {new Date(note.created_at).toLocaleDateString()}
                                    </div>
                                    {note.file_urls?.length > 0 && (
                                        <div style={{ color: 'var(--primary)' }}>
                                            <Paperclip size={14} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default NotesList
