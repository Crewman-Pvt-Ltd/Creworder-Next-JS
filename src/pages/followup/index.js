import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from '@/components/Layout'
import FollowUpList from '@/components/followup/FollowUpList';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";

const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();

  if (permissionLoading) return <Loader />;

  const router = useRouter();
  const userRole = permissionsData?.role;

  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionsData?.role) {
    return (
      <Layout type={userRole}>
        <FollowUpList />
      </Layout>
    );
  }
};

export default Index;
