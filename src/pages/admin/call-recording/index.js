import React from 'react'
import Layout from '@/components/Layout'
import CallRecordingList from '@/components/call-recording/CallRecordingList';
const Index = () => {

    return (
      <Layout type="admin">
        <CallRecordingList />
      </Layout>
    );
  };
  
  export default Index;
