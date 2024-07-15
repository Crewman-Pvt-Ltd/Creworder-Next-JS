import React from "react";
import PackageList from "@/components/package/PackageList";
import Layout from "@/components/Layout";
import Createpackage from "@/components/package/Createpackage";
import CompanyList from "@/components/company/CompanyList";
import { useState } from "react";
import {
 
} from "@mui/material";

const Index = () => {
  const [showCreatePackage, setShowCreatePackage] = useState(false);

  const handleShowCreatePackage = () => {
    setShowCreatePackage(true);
  };
  const handleBackToList = () => {
      setShowCreatePackage(false);
    };

  return (
    <Layout>
      {showCreatePackage ? (
        <Createpackage onPackageList={handleBackToList} />
      ) : (
        <PackageList onCreatePackage={handleShowCreatePackage} />
      )}
    </Layout>
  );
};

export default Index;
