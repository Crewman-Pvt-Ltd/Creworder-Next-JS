import React from 'react'
import Layout from '@/components/Layout'
import TelephonicChannelsList from '@/components/telephonicchannels/TelephonicChannelsList';
const Index = () => {
    return (
      <Layout type="admin">
        <TelephonicChannelsList />
      </Layout>
    );
  };
  
  export default Index;
