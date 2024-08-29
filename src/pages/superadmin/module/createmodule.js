import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import CreateModule from "@/components/module/CreateModule";
import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";
import { useRouter } from "next/router";

const createmodule = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!permissionLoading && permissionsData?.role !== "superadmin") {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;

  if (permissionsData?.role === "superadmin") {
    return (
      <Layout type="superadmin">
        <CreateModule />
      </Layout>
    );
  }

  return null;
};

export default createmodule;
