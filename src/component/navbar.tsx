import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import CoustomAvatar from "../component/coustom_avatar";

export default function Navbar() {
  const navigation = [
    { title: "Report", path: "#" },
    { title: "Help", path: "#" },
  ];

  const account = useAccount();
  const userState = useSelector((state: RootState) => {
    return state.domegleData; // Add 'return' statement to return the state
  });

  useEffect(() => {
    console.log(userState); // Access 'wallet' property only if 'userState' exists
  }, []);

  return (
    <nav className=" w-full border-b md:border-0 md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="#">
            <h1 className="text-xl text-center font-extrabold">D-Omegle</h1>
          </a>
        </div>
        <div className="flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 hidden">
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-600 hover:text-indigo-600 text-sm"
                >
                  <a href={item.path}>{item.title}</a>
                </li>
              );
            })}
            <li key="exit" className="text-gray-600 hover:text-red-600 text-sm">
              <button onClick={() => console.log("Retuen request")}>
                Return Stack
              </button>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <CoustomAvatar
            address={account.address ?? userState.wallet?.address ?? ""}
          />
          {account.address ? (
            <div className="md:flex gap-3 items-center hidden">
              <p>
                {account.address?.slice(0, 8) +
                  "..." +
                  account.address?.slice(-4)}
              </p>
            </div>
          ) : (
            <div className="md:flex gap-3 items-center hidden">
              <p>{userState.wallet?.address}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
