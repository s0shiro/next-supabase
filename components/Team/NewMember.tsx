import { useHelpers } from '@/hooks/useHelpers'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '@/components/ui/label'
import Roles from './Members/Options/Roles'
import { Input } from '../ui/input'
import CustomButton from '../CustomButton'

function NewMember() {
  const { open, setOpen, loading, setLoading } = useHelpers()
  const [member, setMember] = useState({
    name: '',
    email: '',
    role: '',
  })

  async function sendInvitation() {
    try {
      setLoading(true)
    } catch (error: any) {
      console.log(error)
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  function saveMember() {
    return <p>member save</p>
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>
          <span>New Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add new member.</DialogTitle>
          <DialogDescription>Please enter details.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              placeholder='John Doe'
              defaultValue={member.name}
              className='col-span-3'
              onChange={(e: any) =>
                setMember((prev: any) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Email
            </Label>
            <Input
              id='email'
              defaultValue={member.email}
              placeholder='johndoe@gmail.com'
              className='col-span-3'
              onChange={(e: any) =>
                setMember((prev: any) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Select role
            </Label>
            <div className='w-[240px]'>
              <Roles
                selected={member.role}
                setSelected={(v: string) => {
                  setMember((prev: any) => ({ ...prev, role: v }))
                }}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <CustomButton
            {...{ label: 'Send invitation', loading, onClick: saveMember }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewMember
