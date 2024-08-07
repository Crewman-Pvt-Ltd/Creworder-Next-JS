import React from "react";
import NoticeList from "@/components/notice/NoticeList";
import Layout from "@/components/Layout";

import {
 
} from "@mui/material";

const Index = () => {


  return (
    <Layout type="superadmin">
     <NoticeList />
    </Layout>
  );
};

export default Index;
