import AuthScreen from "./screens/Auth.screen";
import { useSelector } from "react-redux";
import { RootState } from "./state-managment/store";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const authStatus = useSelector(
    (state: RootState) => state.auth.userAuthenticated
  );
  return !authStatus ? (
    <AuthScreen />
  ) : (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
