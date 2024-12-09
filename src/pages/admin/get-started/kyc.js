import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Kyc from "@/components/GetStarted/Kyc";
import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";

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
        <Kyc type="admin"/>
      </Layout>
    );
  }

  return null;
};

export default Index;
