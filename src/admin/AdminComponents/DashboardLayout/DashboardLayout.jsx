import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

function DashboardLayout() {

    return (
        <div className="app__admin-layout">
            <div className="app__admin-inner">
                <Sidebar />
                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
