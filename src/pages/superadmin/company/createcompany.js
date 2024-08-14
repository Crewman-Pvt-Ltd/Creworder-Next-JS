import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import CreateCompanyLayout from "@/components/company/CreateCompanyLayout";
import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";

const CreateCompany = () => {
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
        <CreateCompanyLayout />
      </Layout>
    );
  }

  return null;
};

export default CreateCompany;
