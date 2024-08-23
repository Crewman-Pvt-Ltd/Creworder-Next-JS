import React from 'react'
import Layout from '@/components/Layout'
import InvoiceManagementList from '@/components/invoice-management/InvoiceManagementList';
import { useState } from 'react';
const Index = () => {

    return (
      <Layout type="admin">
        <InvoiceManagementList />
      </Layout>
    );
  };
  
  export default Index;
