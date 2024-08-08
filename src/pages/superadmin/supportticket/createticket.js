import React from 'react'
import Layout from '@/components/Layout'
import SupportTicketCreate from '@/components/supportticket/SupportTicketCreate'
const createticket = () => {
  return (
    <Layout type="superadmin">
        <SupportTicketCreate />
    </Layout>
  )
}

export default createticket
