import { getBioContent, getBioTimeline } from '@/lib/bio'
import BioAdminClient from './BioAdminClient'

export const metadata = {
  title: 'Biographie — Admin',
}

export default async function AdminBioPage() {
  const [bio, timeline] = await Promise.all([
    getBioContent(),
    getBioTimeline(),
  ])

  return <BioAdminClient bio={bio} timeline={timeline} />
}
