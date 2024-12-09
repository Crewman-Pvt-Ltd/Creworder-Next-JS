import Layout from '@/components/Layout';
import EditEmployees from '@/components/hr-employees/EditEmployees';
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from '@/components/Loader';
const EditEmployeesPage = () => {
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
      <EditEmployees />
    </Layout>
 );
}
};

export default EditEmployeesPage;