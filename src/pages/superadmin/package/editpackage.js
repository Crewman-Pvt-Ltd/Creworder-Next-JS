import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import EditPackage from "@/components/package/EditPackage";
import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";
import { useRouter } from "next/router";

const EditPackagePage = () => {
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
        <EditPackage />
      </Layout>
    );
  }

  return null;
};

export default EditPackagePage;
