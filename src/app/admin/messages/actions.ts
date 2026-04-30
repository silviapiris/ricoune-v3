'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type ContactMessage = {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string | null
  type_evenement: string | null
  date_souhaitee: string | null
  ville: string | null
  message: string
  read: boolean
  created_at: string
}

export async function getMessages(): Promise<{
  messages: ContactMessage[]
  unreadCount: number
}> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getMessages]:', error.message)
    return { messages: [], unreadCount: 0 }
  }

  const messages = (data ?? []) as ContactMessage[]
  const unreadCount = messages.filter((m) => !m.read).length

  return { messages, unreadCount }
}

export async function toggleReadStatus(
  id: string,
  currentRead: boolean
): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('contact_messages')
    .update({ read: !currentRead })
    .eq('id', id)

  if (error) {
    console.error('[toggleReadStatus]:', error.message)
    return { error: 'Erreur lors de la mise à jour.' }
  }

  revalidatePath('/admin/messages')
  revalidatePath('/admin')
  return {}
}

export async function deleteMessage(id: string): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[deleteMessage]:', error.message)
    return { error: 'Erreur lors de la suppression.' }
  }

  revalidatePath('/admin/messages')
  revalidatePath('/admin')
  return {}
}
