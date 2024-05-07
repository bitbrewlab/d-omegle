import { useDispatch } from "react-redux";
import { disconnect } from "../state-managment/reducers/auth.slice";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="flex justify-between items-center px-20 py-5 border-b bg-white">
      <h1 className="text-3xl font-extrabold">Domegle</h1>

      <ul className="flex items-center gap-10">
        <li className="hover:font-bold duration-300 hover:text-red-500">
          <Link to="/">Report</Link>
        </li>
        <li className="hover:font-bold duration-300">
          <Link to="/">Help</Link>
        </li>
        <li className="hover:font-bold duration-300">
          <Link to="/">Withdraw</Link>
        </li>
      </ul>
      <button
        onClick={() => dispatch(disconnect())}
        className="bg-red-500 text-white border border-black py-1 px-5 rounded-full"
      >
        Disconnect
      </button>
    </nav>
  );
}

export default Navbar;
