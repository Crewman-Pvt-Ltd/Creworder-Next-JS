import React, { useEffect } from "react";
import Layout from '@/components/Layout';
import EditDesignation from '@/components/designation/EditDesignation';
import { useRouter } from "next/router";
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";

const editdesignation = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  if (permissionLoading) return <Loader />;
  const router = useRouter();
  const userRole = permissionsData?.role;
  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);
  if (permissionsData?.role) {
    return (
      <Layout type={userRole}>
        <EditDesignation />
      </Layout>
    );
  }
};
export default editdesignation;