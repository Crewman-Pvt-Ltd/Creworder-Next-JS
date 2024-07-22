import React from "react";
import PackageList from "@/components/package/PackageList";
import Layout from "@/components/Layout";
import Createpackage from "@/components/package/Createpackage";
import { useState } from "react";
import {} from "@mui/material";
import EditPackage from "@/components/package/EditPackage";

const Index = () => {
//   const [showCreatePackage, setShowCreatePackage] = useState(false);
//   const [editingPackage, setEditingPackage] = useState(null);

//   const handleShowCreatePackage = () => {
//     setShowCreatePackage(true);
//   };
//   const handleBackToList = () => {
//     setShowCreatePackage(false);
//     setEditingPackage(null);
//   };
// const handleEditPackage =(packages) =>{
//   setEditingPackage(packages);
//   setShowCreatePackage(true);
// }
// const handleUpdatepackage =() =>{
//   handleBackToList();
// }
  return (
    <Layout>
      {/* {showCreatePackage ? (
        editingPackage ?(
          <EditPackage onUpdatePackage={handleUpdatepackage}/>
        ) : (
        <Createpackage onPackageList={handleBackToList} />
        )
      ) : (
        <PackageList onCreatePackage={handleShowCreatePackage} onEditPackage={handleEditPackage}/>
      )} */}
      <PackageList />
    </Layout>
  );
};

export default Index;
