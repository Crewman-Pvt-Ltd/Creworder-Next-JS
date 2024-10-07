import Layout from '@/components/Layout'
import CreateOrder from '@/components/orders/CreateOrder'
import EditOrder from '@/components/orders/EditOrder'
import React from 'react'

const editorders = () => {
  return (
    <Layout type= "admin">
      <EditOrder />
    </Layout>
  )
}

export default editorders;
