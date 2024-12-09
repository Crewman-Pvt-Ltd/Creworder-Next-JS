import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ShiftRosterList from "@/components/shift-roster/ShiftRosterList";
import AddShiftRoster from "@/components/shift-roster/AddShiftRoster";
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const [showAddShiftRoster, setShowAddShiftRoster] = useState(false);
  const router = useRouter();

  const userRole = permissionsData?.role;

  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;

  const handleAddShiftRoster = () => {
    setShowAddShiftRoster(true);
  };

  const handleShowShiftRosterList = () => {
    setShowAddShiftRoster(false);
  };

  const handleSubmit = () => {
    handleShowShiftRosterList();
  };

  if (userRole) {
    return (
      <Layout type={userRole}>
        {showAddShiftRoster ? (
          <AddShiftRoster
            onShiftRosterList={handleShowShiftRosterList}
            onSubmit={handleSubmit}
          />
        ) : (
          <ShiftRosterList onAddShiftRoster={handleAddShiftRoster} />
        )}
      </Layout>
    );
  }

 
  return null;
};

export default Index;
