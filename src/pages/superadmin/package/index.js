import React from "react";
import Layout from "@/components/Layout";
import CreateCompanyLayout from "@/components/superadmin/company/CreateCompanyLayout";
import CompanyList from "@/components/superadmin/company/CompanyList";
import { useState } from "react";
import {
 
} from "@mui/material";
const Index = () => {
    const [showCreateCompany, setShowCreateCompany] = useState(false);
  
    const handleShowCreateCompany = () => {
      setShowCreateCompany(true);
    };
    const handleBackToList = () => {
        setShowCreateCompany(false);
      };
  
    return (
      <Layout>
        {showCreateCompany ? (
          <CreateCompanyLayout onCompanyList={handleBackToList} />
        ) : (
          <CompanyList onCreateCompany={handleShowCreateCompany} />
        )}
      </Layout>
    );
  };
  
  export default Index;
