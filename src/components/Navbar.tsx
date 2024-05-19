import { useDispatch } from "react-redux";
import { disconnect } from "../state-managment/reducers/auth.slice";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-[#f2f2f2]">
      <h1 className="text-2xl font-extrabold">
        :D<span className="font-medium pl-1">omegle</span>
      </h1>

      <ul className="flex items-center gap-10 hidden">
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
        className="bg-white duration-200 hover:bg-red-500 hover:text-white border border-black py-1 px-5 rounded-full "
      >
        Disconnect
      </button>
    </nav>
  );
}

export default Navbar;
