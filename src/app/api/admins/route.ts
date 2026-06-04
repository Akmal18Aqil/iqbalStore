import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { createClient as createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { user_id } = body
    if (!user_id) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })

    // Verify requester is an admin via session cookie
    const serverSupabase = await createServerSupabaseClient()
    const { data: authData } = await serverSupabase.auth.getUser()
    const user = authData?.user
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const { data: adminRow } = await serverSupabase.from('admins').select('user_id').eq('user_id', user.id).single()
    if (!adminRow) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Use service role to insert new admin (bypass RLS)
    const service = createServiceClient()
    const { error } = await service.from('admins').insert([{ user_id }]).select()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
