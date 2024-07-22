import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SupportTicketList from '@/components/supportticket/SupportTicketList';
import SupportTicketCreate from '@/components/supportticket/SupportTicketCreate';
import EditTicket from '@/components/supportticket/EditTicket';

const Index = () => {
  // const [showCreateTicket, setShowCreateTicket] = useState(false);
  // const [editingTicket, setEditingTicket] = useState(null);

  // const handleShowCreateTicket = () => {
  //   setShowCreateTicket(true);
  // };

  // const handleBackToList = () => {
  //   setShowCreateTicket(false);
  //   setEditingTicket(null);
  // };

  // const handleEditTicket = (ticket) => {
  //   setEditingTicket(ticket);
  //   setShowCreateTicket(true);
  // };

  // const handleUpdateTicket = () => {
   
  //   handleBackToList();
  // };

  return (
    <Layout>
      {/* {showCreateTicket ? (
        editingTicket ? (
          <EditTicket onUpdateTicket={handleUpdateTicket} />
        ) : (
          <SupportTicketCreate onTicketList={handleBackToList} />
        )
      ) : (
        <SupportTicketList onCreateTicket={handleShowCreateTicket} onEditTicket={handleEditTicket} />
      )} */}
      <SupportTicketList />
    </Layout>
  );
};

export default Index;
