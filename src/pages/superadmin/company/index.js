import React from "react";
import Layout from "@/components/Layout";
import CreateCompanyLayout from "@/components/company/CreateCompanyLayout";
import CompanyList from "@/components/company/CompanyList";
import { useState } from "react";
import EditCompany from "@/components/company/EditCompany";
const Index = () => {
//     const [showCreateCompany, setShowCreateCompany] = useState(false);
//     const [editingCompany, setEditingCompany] = useState(null);
  
//     const handleShowCreateCompany = () => {
//       setShowCreateCompany(true);
//     };
//     const handleBackToList = () => {
//         setShowCreateCompany(false);
//         setEditingCompany(null);
//       };
//   const handleEditCompany=(company) =>{
//     setEditingCompany(company);
//     setShowCreateCompany(true);

//   };
//   const handleUpdateCompany =() =>{
// handleBackToList();

//   }
    return (
      <Layout>
        {/* {showCreateCompany ? (
          editingCompany ?(
            <EditCompany onUpdateCompany={handleUpdateCompany}/>
          ) : (
          <CreateCompanyLayout onCompanyList={handleBackToList} />
          )
        ) : (
          <CompanyList onCreateCompany={handleShowCreateCompany} onEditCompany={handleEditCompany} />
        )} */}
        <CompanyList />
      </Layout>
    );
  };
  
  export default Index;
