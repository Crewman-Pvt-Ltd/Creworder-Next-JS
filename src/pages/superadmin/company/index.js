import React from "react";
import Layout from "@/components/Layout";

import CompanyList from "@/components/company/CompanyList";

const Index = () => {

    return (
      <Layout type="superadmin">
        <CompanyList />
      </Layout>
    );
  };
  
  export default Index;
