import React from 'react'
import Layout from '@/components/Layout'
import InvoiceManagementList from '@/components/invoice-management/InvoiceManagementList';
const Index = () => {

    return (
      <Layout type="admin">
        <InvoiceManagementList />
      </Layout>
    );
  };
  
  export default Index;
