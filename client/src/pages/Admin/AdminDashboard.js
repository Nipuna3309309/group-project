import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [totalusers, setTotalUsers] = useState(0);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <p className="p-3">
              <div className="card w-75 p-3">
                <h3>Admin Name: {auth?.user?.name}</h3>
                <h3>Admin Email: {auth?.user?.email}</h3>
                <h3>Admin Contact: {auth?.user?.phone}</h3>
              </div>
            </p>
            <div className="card w-75 p-3">
              <h5>User Accounts</h5>
            </div>
            {/* Add other cards or components as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
