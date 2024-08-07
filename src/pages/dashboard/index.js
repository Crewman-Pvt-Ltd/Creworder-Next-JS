import React from "react";
import dynamic from 'next/dynamic'
import { usePermissions } from "@/contexts/PermissionsContext";
import Layout from "@/components/Layout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/components/dashboard/SuperAdminDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";


export const Admin = () => {

    const router = useRouter();

    const { permissionsData, permissionLoading } = usePermissions();

    if (permissionLoading) return <Loader />;

    if (permissionsData?.role == "admin") {
        return (
            <Layout type="admin">
                <AdminDashboard/>
            </Layout>
        );
    }
    else if (permissionsData?.role == "superadmin") {
        return (
            <Layout type="superadmin">
                <SuperAdminDashboard/>
            </Layout>
        )
    }

    else if (permissionsData?.role == "agent") {
        return (
            <Layout type="agent">
                <AgentDashboard/>
            </Layout>
        )
    }

    else{
        alert("No role defined");
    }

    router.push("/login");
}


export default Admin;
