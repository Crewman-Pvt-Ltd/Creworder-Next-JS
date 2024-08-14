import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import SupportTicketCreate from "@/components/supportticket/SupportTicketCreate";
import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";

const CreateTicketPage = () => {
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
        <SupportTicketCreate />
      </Layout>
    );
  }

  return null;
};

export default CreateTicketPage;
