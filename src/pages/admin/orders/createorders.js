import Layout from '@/components/Layout'
import CreateOrder from '@/components/orders/CreateOrder'
import React from 'react'

const createorders = () => {
  return (
    <Layout type= "admin">
      <CreateOrder />
    </Layout>
  )
}

export default createorders
