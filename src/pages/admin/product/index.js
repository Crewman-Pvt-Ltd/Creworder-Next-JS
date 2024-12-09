import Layout from '@/components/Layout'
import ProductList from '@/components/product/ProductList'
import React from 'react'

const index = () => {
  return (
    <Layout type= "admin">
        <ProductList />
    </Layout>
  )
}

export default index;
