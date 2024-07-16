import React from "react";
import dynamic from 'next/dynamic'
import { usePermissions } from "@/contexts/PermissionsContext";
import Layout from "@/components/Layout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/components/dashboard/SuperAdminDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import Loader from "@/components/Loader";


export const Admin = () => {

    const { permissionsData, loading } = usePermissions();

    if (loading) return <Loader />;

    if (permissionsData?.role == "admin") {
        return (
            <Layout>
                <AdminDashboard/>
            </Layout>
        );
    }
    else if (permissionsData?.role == "superadmin") {
        return (
            <Layout>
                <SuperAdminDashboard/>
            </Layout>
        )
    }

    else if (permissionsData?.role == "agent") {
        return (
            <Layout>
                <AgentDashboard/>
            </Layout>
        )
    }

    return (
        <h1>No Role Defined</h1>
    );
}


export default Admin;
