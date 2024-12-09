import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { usePermissions } from "@/contexts/PermissionsContext";
import CompanyList from "@/components/company/CompanyList";

import Loader from "@/components/Loader";
import EmailTemplate from "@/components/email-templates/EmailTemplate";

const Index = () => {
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
        <EmailTemplate />
      </Layout>
    );
  }

  return null;
};

export default Index;
