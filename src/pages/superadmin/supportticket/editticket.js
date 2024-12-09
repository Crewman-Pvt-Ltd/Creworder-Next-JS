import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import EditTicket from "@/components/supportticket/EditTicket";
import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";

const EditTicketPage = () => {
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
        <EditTicket />
      </Layout>
    );
  }

  return null;
};

export default EditTicketPage;
