import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import CheckList from "@/components/GetStarted/Checklist";
import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";
import EmailAndSMSCommunication from "@/components/integrations/EmailAndSMSCommunication";
import WhatsappCommunication from "@/components/integrations/WhatsappCommunication";

const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const router = useRouter();
  useEffect(() => {
    if (!permissionLoading && permissionsData?.role !== "admin") {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);
  if (permissionLoading) return <Loader />;
  if (permissionsData?.role === "admin") {
    return (
      <Layout type="admin">
        <CheckList type="admin"/>
      </Layout>
    );
  }

  return null;
};

export default Index;
