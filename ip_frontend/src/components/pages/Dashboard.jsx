
import AdminDashboard from "../admin/AdminDashboard";
import { useAuth } from "../context/Authcontext";
import ManagerDashboard from "../manager/ManagerDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null; // just in case

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "member":
      return <MemberDashboard />;
    default:
      return <h2>No dashboard available</h2>;
  }
}
