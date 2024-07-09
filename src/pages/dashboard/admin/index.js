import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";
import Layout from "@/components/Layout";
import React from "react";

const Admin = () => {
    return (
        <div>
            <Layout>
                <AdminDashboard />
            </Layout>
        </div>
    );
};

export default Admin;
