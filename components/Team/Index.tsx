'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/DataTable'
import NewMember from './NewMember'
import { columns } from './Members/Columns'
import { useHelpers } from '@/hooks/useHelpers'
import { supabase } from '@/lib/supabase'
import LoadingTeam from '../Loading/Team'

function Index() {
  const [team, setTeam] = useState({
    name: 'Team',
    id: '2f99c7ac-25fc-4557-abbd-c47e26a70388',
  })
  const [members, setMembers] = useState<any>([])
  const { loading, setLoading } = useHelpers()

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const { data, error }: any = await supabase
        .from('teams')
        .select('*, team_members(*)')
        .eq('id', '2f99c7ac-25fc-4557-abbd-c47e26a70388')
        .single()

      if (data) {
        const { team_members, ...teamData } = data
        setTeam(teamData)
        setMembers(team_members)
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeam()
    const subscription = supabase
      .channel('channel_team_members')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_members',
          filter: `team_id=eq.${team.id}`,
        },
        (payload: any) => {
          fetchTeam()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) return <LoadingTeam />

  return (
    <div className='grid gap-6 border rounded-lg shadow px-5 py-4 w-full max-w-[800px]'>
      <header className='flex items-start justify-between'>
        <div className='grid gap-1'>
          <h1 className='text-2xl'>{team.name || 'Team'}</h1>
          <p>Invite new members in your team.</p>
        </div>
        <NewMember team_id={team.id} />
      </header>
      <main>
        <DataTable columns={columns} data={members} />
      </main>
    </div>
  )
}

export default Index
