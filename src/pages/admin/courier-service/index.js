import React from 'react'
import Layout from '@/components/Layout'
import CourierServiceList from '@/components/courierservice/CourierServiceList';
import { useState } from 'react';
const Index = () => {

    return (
      <Layout type="admin">
        <CourierServiceList />
      </Layout>
    );
  };
  
  export default Index;
