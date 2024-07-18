import React from 'react'
import Layout from '@/components/Layout'
import SupportTicketList from '@/components/supportticket/SupportTicketList'
import SupportTicketCreate from '@/components/supportticket/SupportTicketCreate'
import { useState } from 'react'

const Index = () => {
    const [showCreateTicket, setShowCreateTicket] = useState(false);
  
    const handleShowCreateTicket = () => {
      setShowCreateTicket(true);
    };
    const handleBackToList = () => {
        setShowCreateTicket(false);
      };
  
    return (
      <Layout>
        {showCreateTicket ? (
          <SupportTicketCreate onTicketList={handleBackToList} />
        ) : (
          <SupportTicketList onCreateTicket={handleShowCreateTicket} />
        )}
      </Layout>
    );
  };

export default Index
