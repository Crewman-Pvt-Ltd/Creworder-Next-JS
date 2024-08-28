import React, { useEffect } from "react";
import Layout from '@/components/Layout'
import PlansAndPricing from '@/components/plans-pricing/PlansAndPricing'
import { usePermissions } from "@/contexts/PermissionsContext";
import { useRouter } from 'next/router';
import Loader from "@/components/Loader";
const index = () => {
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
      <PlansAndPricing />
    </Layout>
  );
}

return null;
};

export default index
