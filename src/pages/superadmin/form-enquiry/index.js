import React from 'react'
import Layout from '@/components/Layout'
import FormEnquiryList from '@/components/FormEnquiry/FormEnquiryList';
import { useState } from 'react';
const Index = () => {

    return (
      <Layout type="superadmin">
        <FormEnquiryList />
      </Layout>
    );
  };
  
  export default Index;
