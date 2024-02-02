import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/v1/auth/admin/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditRole = (userId) => {
    const newRole = window.prompt(
      "Enter new role (2 for EmployeeManager,1 for Admin, 0 for User):"
    );
    if (newRole !== null) {
      // User clicked OK in the prompt
      updateRole(userId, parseInt(newRole, 10));
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      await axios.put(`/api/v1/auth/admin/users/role/${userId}`, {
        role: newRole,
      });
      // Refetch the user list after updating the role
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>

                  <th>Admin/Employee</th>
                  <th>View</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>

                      <td>
                        {user.role === 1
                          ? "Admin"
                          : user.role === 2
                          ? "EmployeeManager"
                          : "User"}
                      </td>
                      <td>
                        <Link
                          to={`/dashboard/admin/users/${user._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>{" "}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEditRole(user._id)}
                        >
                          Edit
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
