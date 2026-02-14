import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Save, X, Paperclip, File, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CreateNote = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files)
        setFiles([...files, ...selectedFiles])
    }

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!title.trim()) return alert('Please enter a title')

        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()

            const { error } = await supabase
                .from('notes')
                .insert([
                    {
                        title,
                        content,
                        user_id: user.id,
                        // Filtering for file names for now, in a full app we'd upload to Storage first
                        file_urls: files.map(f => f.name)
                    }
                ])

            if (error) throw error
            navigate('/notes')
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Create New Note</h1>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={() => navigate('/notes')}
                        style={{
                            padding: '0.625rem 1.25rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(255,255,255,0.05)',
                            fontWeight: 600,
                            fontSize: '0.9rem'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        style={{
                            padding: '0.625rem 1.25rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--primary)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Note'}
                    </button>
                </div>
            </div>

            <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: '100%',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        background: 'transparent',
                        border: 'none',
                        padding: '0 0 1rem 0',
                        borderBottom: '1px solid var(--border)',
                        borderRadius: 0,
                        marginBottom: '1.5rem'
                    }}
                />

                <textarea
                    placeholder="Start typing your thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        width: '100%',
                        minHeight: '300px',
                        background: 'transparent',
                        border: 'none',
                        resize: 'none',
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        padding: 0
                    }}
                />

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            color: 'var(--primary)',
                            fontWeight: 600,
                            fontSize: '0.9rem'
                        }}>
                            <Paperclip size={18} />
                            Attach Files
                            <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                        </label>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Max file size: 10MB</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {files.map((file, index) => (
                            <div key={index} style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '0.5rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                border: '1px solid var(--border)'
                            }}>
                                <File size={16} color="var(--text-muted)" />
                                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                                    {file.name}
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    style={{ background: 'transparent', color: '#ef4444', display: 'flex' }}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNote
