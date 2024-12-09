import Layout from '@/components/Layout'
import OrderList from '@/components/orders/OrderList'
import React from 'react'

const index = () => {
  return (
    <Layout type= "admin">
        <OrderList />
    </Layout>
  )
}

export default index;
