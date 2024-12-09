import React, { useEffect } from "react";
import Layout from "@/components/Layout";

import Loader from "@/components/Loader";
import { usePermissions } from "@/contexts/PermissionsContext";
import { useRouter } from "next/router";
import CreateSubMenu from "@/components/submenu/CreateSubMenu";

const createsubmenu = () => {
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
        <CreateSubMenu />
      </Layout>
    );
  }

  return null;
};

export default createsubmenu;
