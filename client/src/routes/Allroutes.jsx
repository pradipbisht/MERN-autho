import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/LogIn";
import AdminDash from "../acess/admin/AdminDash";
import ManagerDash from "../acess/manager/ManagerDash";
import ProtectedRoute from "../components/ProtectedRoutes";
import Unauthorized from "../pages/Unauthorised";
import AdminUserList from "../acess/admin/AdminUserList";

function Allroutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Public routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user", "manager", "admin"]}>
              <h1>User Dashboard</h1>
            </ProtectedRoute>
          }
        />
        {/* protected routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <ManagerDash />
            </ProtectedRoute>
          }
        />
        {/* Admin-route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDash />
              {/* <Route path="users" element={<AdminUserList />} /> */}
            </ProtectedRoute>
          }>
          <Route path="users" element={<AdminUserList />} />
        </Route>
      </Routes>
    </>
  );
}

export default Allroutes;
