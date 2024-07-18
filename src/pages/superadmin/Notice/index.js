import React from "react";
import NoticeList from "@/components/Notice/NoticeList";
import Layout from "@/components/Layout";
import CreateNotice from "@/components/Notice/CreateNotice";
import { useState } from "react";
import {
 
} from "@mui/material";

const Index = () => {
  const [showCreateNotice, setShowCreateNotice] = useState(false);

  const handleShowCreateNotice = () => {
    setShowCreateNotice(true);
  };
  const handleBackToList = () => {
      setShowCreateNotice(false);
    };

  return (
    <Layout>
      {showCreateNotice ? (
        <CreateNotice onNoticeList={handleBackToList} />
      ) : (
        <NoticeList onNotice={handleShowCreateNotice} />
      )}
    </Layout>
  );
};

export default Index;
