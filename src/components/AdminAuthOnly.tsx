import React from 'react'
import type { User } from '../types'

interface Props {
  children: React.ReactNode
  user: User
}

function KitchenAuthOnly({ user, children }: Props) {
  if (user.auth !== 'admin') {
    return null
  }
  return <>{children}</>
}

export default KitchenAuthOnly
