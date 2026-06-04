"use client"

import { useState } from 'react'

export default function AdminsClient({ initial }: { initial?: string[] }) {
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setMessage('Admin added')
      setUserId('')
      window.location.reload()
    } catch (err: any) {
      setMessage(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="user_id (UUID)" className="admin-input" />
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Admin'}</button>
        </div>
      </form>
      {message && <p style={{ marginTop: '0.5rem' }}>{message}</p>}
    </div>
  )
}
