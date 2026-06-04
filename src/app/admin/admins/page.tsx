import { createClient } from '@/lib/supabase/server'
import AdminsClient from './AdminsClient'

export default async function AdminsPage() {
  const supabase = await createClient()
  const { data: admins } = await supabase.from('admins').select('*')

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Manajemen Admin</h1>
      <p style={{ color: 'var(--admin-text-muted)' }}>Tambahkan akun Supabase Auth sebagai admin.</p>

      <div className="admin-card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>Admin Saat Ini</h2>
        <ul>
          {admins && admins.length > 0 ? (
            admins.map((a: any) => <li key={a.id}>{a.user_id}</li>)
          ) : (
            <li>Tidak ada admin terdaftar.</li>
          )}
        </ul>

        <AdminsClient />
      </div>
    </div>
  )
}
