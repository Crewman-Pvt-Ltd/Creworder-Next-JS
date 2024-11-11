import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ReadyToDispatch from "@/components/shipment/ReadyToDispatch";
import Layout from "@/components/Layout";
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
const readytodispatch = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  if (permissionLoading) return <Loader />;
  const router = useRouter();
  const userRole = permissionsData?.role;
  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  },
  [permissionLoading, permissionsData, router]);
  if (permissionsData?.role) {
    return (
      <Layout type={userRole}>
        <ReadyToDispatch />
      </Layout>
    );
  }
};

export default readytodispatch;