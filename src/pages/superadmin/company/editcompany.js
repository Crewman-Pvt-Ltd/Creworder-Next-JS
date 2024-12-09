import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import EditCompany from "@/components/company/EditCompany";
import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";

const EditCompanyPage = () => {
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
        <EditCompany />
      </Layout>
    );
  }

  return null;
};

export default EditCompanyPage;
