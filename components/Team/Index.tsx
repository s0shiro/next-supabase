'use client'

import { useState } from 'react'
import DataTable from '@/components/DataTable'
import NewMember from './NewMember'
import { columns } from './Members/Columns'

function Index() {
  const [members, setMembers] = useState<any>([
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      status: 'active',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'member',
      status: 'pending',
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'admin',
      status: 'removed',
    },
  ])

  return (
    <div className='grid gap-6 border rounded-lg shadow px-5 py-4 w-full max-w-[800px]'>
      <header className='flex items-start justify-between'>
        <div className='grid gap-1'>
          <h1 className='text-2xl'>Team</h1>
          <p>Invite new members in your team.</p>
        </div>
        <NewMember />
      </header>
      <main>
        <DataTable columns={columns} data={members} />
      </main>
    </div>
  )
}

export default Index
