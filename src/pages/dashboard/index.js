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

    router.push("/login");
}


export default Admin;
