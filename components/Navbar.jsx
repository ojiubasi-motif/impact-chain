// Importing the necessary dependencies from React and Next.js
import Link from "next/link";
import Image from "next/image";
import { useState, Fragment, useEffect } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import UAuth from "@uauth/js";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

// This component renders individual items in the navigation bar
const NavBarItem = ({ title, classprops, link }) => (
  // Creating an <li> element with a Link component wrapped around the item title

  <li
    // Setting the class name of the <li> element with dynamic classes
    className={`font-medium tracking-wide text-[#777] transition-colors duration-200 hover:text-deep-purple-accent-400 cursor-pointer ${classprops}`}
  >
    <Link href={`${link}`}>{title}</Link>
  </li>
);
// This component renders the entire navigation bar
export const Navbar = (props) => {
  const connectMM = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  // Creating a state variable to toggle the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [connectedWallet, setWallet] = useState({ channel: null, addr: null });

  useEffect(() => {
    if (address) {
      setWallet({ channel: "MM", addr: address });
    }
    // setWallet({channel:null, addr:address})
  }, [address]);

  // ===========login & logout functions============
  const uauth = new UAuth({
    clientID: "6a383979-d7c1-455d-a4a5-d3445dbc101e",
    redirectUri: "https://impactchain.vercel.app/",
    scope: "openid wallet",
  });

  const UDlogin = () => {
    uauth
      .loginWithPopup()
      .then((authorization) =>
        setWallet({
          channel: "UD",
          addr: authorization?.idToken?.wallet_address,
        })
      );
  };

  const logout = () => {};
  const disconnectMM = () => {
    disconnect;
    setWallet({ channel: null, addr: null });
  };
  // =====end of auth functions===========

  return (
    // Creating a container element for the entire navigation bar
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        {/* Creating a Logo for the Navbar */}
        <Link
          href="/"
          aria-label="LOGIC"
          title="LOGIC"
          className="inline-flex items-center"
        >
          <span className="ml-2 text-xl font-bold tracking-wide uppercase">
            ImpactChain
          </span>
        </Link>
        {/* Creating the navigation items */}
        <ul className="flex items-center hidden space-x-8 lg:flex">
          {/* ==================dropdown========= */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {!connectedWallet?.addr
                  ? "Login"
                  : `${connectedWallet?.addr?.slice(
                      0,
                      5
                    )}...${connectedWallet?.addr?.slice(38)}`}
                {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {!connectedWallet?.addr ? (
                  <div className="py-1 px-2">
                    <Menu.Item>
                      <button
                        onClick={UDlogin}
                        className="rounded mb-2 p-2 text-blue-600 items-center justify-center flex w-100 bg-slate-50"
                      >
                        <img
                          src="unnamed.png"
                          className="w-5 h-5 mr-2"
                          alt="unstoppableImg"
                        />
                        <p className=" m-0 p-0">Unstoppable Domain</p>
                      </button>
                    </Menu.Item>

                    <Menu.Item>
                      <button
                        onClick={connectMM}
                        className="rounded mb-2 p-2 items-center justify-center flex w-100 bg-slate-50"
                      >
                        <img
                          src="mm.png"
                          className="w-8 h-5 mr-2"
                          alt="unstoppableImg"
                        />
                        <p className=" m-0 p-0 text-black">METAMASK</p>
                      </button>
                    </Menu.Item>
                  </div>
                ) : connectedWallet?.channel == "UD" ? (
                  <div className="py-1 px-2">
                    <Menu.Item>
                      <button
                        onClick={logout}
                        className="rounded mb-2 p-2 text-blue-600 items-center justify-center flex w-100 bg-slate-50"
                      >
                        <img
                          src="unnamed.png"
                          className="w-5 h-5 mr-2"
                          alt="unstoppableImg"
                        />
                        <p className=" m-0 p-0">LogOut</p>
                      </button>
                    </Menu.Item>
                  </div>
                ) : (
                  <div className="py-1 px-2">
                    <Menu.Item>
                      <button
                        onClick={disconnectMM}
                        className="rounded mb-2 p-2 items-center justify-center flex w-100 bg-slate-50"
                      >
                        <img
                          src="mm.png"
                          className="w-8 h-5 mr-2"
                          alt="unstoppableImg"
                        />
                        <p className=" m-0 p-0 text-black">Disconnect Wallet</p>
                      </button>
                    </Menu.Item>
                  </div>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
          {/* ==============end================= */}

          {/* Mapping through an array of navigation items to create individual NavBarItem components */}
          {/* {[
            // TODO : You can add multiple pages, following the below sample
            // { title: 'Home', link: '#' },
            // { title: 'NFTs', link: '#' },
            // { title: 'About us', link: '#' },
          ].map((item, index) => (
            <NavBarItem
              key={item.title + index}
              title={item.title}
              link={item.link}
            />
          ))} */}
          {/* Conditionally rendering a Connect Wallet button based on whether the user is currently connected or not */}
          {/* <li>
            {props.walletConnected() ? (
              <p
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none cursor-pointer"
                aria-label="Connected"
                title="Connected"
              >
                Wallet Connected
              </p>
            ) : (
              <p
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md  focus:shadow-outline focus:outline-none cursor-pointer"
                aria-label="Connect Wallet"
                title="Connect Wallet"
                onClick={() => props.connect()}
              >
                Connect Wallet
              </p>
            )}
          </li> */}
        </ul>

        {/* ========mobile menu icon========= */}
        <div className="lg:hidden">
          {/* Conditionally rendering the mobile menu icon based on whether the mobile menu is open or not */}
          {!isMenuOpen && (
            <CgMenuGridR
              fontSize={50}
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}

          {/* Creating the mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-10">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href="#"
                      aria-label="LOGIC"
                      title="LOGIC"
                      className="inline-flex items-center"
                    >
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        LOGIC
                      </span>
                    </Link>
                  </div>
                  <div>
                    <AiOutlineClose
                      fontSize={28}
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>
                </div>

                <nav>
                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Dropdown button{" "}
                    <svg
                      class="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {/* <!-- Dropdown menu --> */}
                  <div
                    id="dropdown"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>

                  <ul className="space-y-4">
                    {/* ==================dropdown========= */}
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {!connectedWallet?.addr
                            ? "Login"
                            : `${connectedWallet?.addr?.slice(
                                0,
                                5
                              )}...${connectedWallet?.addr?.slice(38)}`}
                          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {!connectedWallet?.addr ? (
                            <div className="py-1 px-2">
                              <Menu.Item>
                                <button
                                  onClick={UDlogin}
                                  className="rounded mb-2 p-2 text-blue-600 items-center justify-center flex w-100 bg-slate-50"
                                >
                                  <img
                                    src="unnamed.png"
                                    className="w-5 h-5 mr-2"
                                    alt="unstoppableImg"
                                  />
                                  <p className=" m-0 p-0">Unstoppable Domain</p>
                                </button>
                              </Menu.Item>

                              <Menu.Item>
                                <button
                                  onClick={connectMM}
                                  className="rounded mb-2 p-2 items-center justify-center flex w-100 bg-slate-50"
                                >
                                  <img
                                    src="mm.png"
                                    className="w-8 h-5 mr-2"
                                    alt="unstoppableImg"
                                  />
                                  <p className=" m-0 p-0 text-black">
                                    METAMASK
                                  </p>
                                </button>
                              </Menu.Item>
                            </div>
                          ) : connectedWallet?.channel == "UD" ? (
                            <div className="py-1 px-2">
                              <Menu.Item>
                                <button
                                  onClick={logout}
                                  className="rounded mb-2 p-2 text-blue-600 items-center justify-center flex w-100 bg-slate-50"
                                >
                                  <img
                                    src="unnamed.png"
                                    className="w-5 h-5 mr-2"
                                    alt="unstoppableImg"
                                  />
                                  <p className=" m-0 p-0">LogOut</p>
                                </button>
                              </Menu.Item>
                            </div>
                          ) : (
                            <div className="py-1 px-2">
                              <Menu.Item>
                                <button
                                  onClick={disconnectMM}
                                  className="rounded mb-2 p-2 items-center justify-center flex w-100 bg-slate-50"
                                >
                                  <img
                                    src="mm.png"
                                    className="w-8 h-5 mr-2"
                                    alt="unstoppableImg"
                                  />
                                  <p className=" m-0 p-0 text-black">
                                    Disconnect Wallet
                                  </p>
                                </button>
                              </Menu.Item>
                            </div>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* ==============end================= */}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
        {/* =======end======== */}
      </div>
    </div>
  );
};

export default Navbar;
