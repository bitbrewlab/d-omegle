import { Outlet } from "react-router";

export default function App() {
  return (
    <div className="select-none">
      <Outlet />
    </div>
  );
}
