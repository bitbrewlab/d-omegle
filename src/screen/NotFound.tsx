import { Link } from "react-router-dom";
import img404 from "../assets/404-img.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <img src={img404} alt="" className="h-60" />
      <h1 className="mt-5">
        You've hit Area <span className="font-bold text-2xl py-3">404</span>,
        better head home quick!
      </h1>
      <Link to={"/"}>
        <button className="mt-5 bg-black text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black hover:border-black hover:border-2 rounded-xl mx-12 duration-300 text-sm">
          Go back home
        </button>
      </Link>
    </div>
  );
}
