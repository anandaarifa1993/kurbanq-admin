"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import MenuItem from "./menuItem";
import logo from "../../public/logoDomba.png";
import Profile from "../../public/image/duarr meme.jpg";
import { removeCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
// import { IUser } from "@/app/types";
import { profile } from "console";
import { BASE_IMAGE_PROFILE } from "@/global";

type userType = {
  id: string;
  icon: ReactNode;
  path: string;
  label: string;
};

type managerProp = {
  children: ReactNode;
  id: string;
  title: string;
  // user: IUser | null
  userList: userType[];
};

const sideBar = ({ children, id, title, userList, }: managerProp) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUsername] = useState<string>("");

  useEffect(() => {
    const name = Cookies.get("name"); // Ambil nama dari cookies
    if (name) {
      setUsername(name); // Set state hanya sekali
    }
  }, []); // Dependency array kosong agar hanya dijalankan sekali

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("id");
    removeCookie("name");
    removeCookie("role");
    router.replace(`/login`);
  };

  return (
    <div className="w-full min-h-dvh">
      {/* header section */}
      <header className="h-auto flex justify-between items-center p-4 mb-0 shadow-xl">
        <div className="flex gap-2 items-center">
          <button onClick={() => setIsShow(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 pt-1 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m16.5 4.5h16.5"
              />
            </svg>
          </button>
          <h1 className="font-bold text-2xl text-[#344CB7] tracking-wider">
            {title}
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-[#fb7c75] hover:text-[#ff3d33]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            <span className="font-extrabold text-xl">Logout</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-[#F0BB78] hover:bg-gray-100 hover:text-[#ff4c43]"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>
      {/* end header section */}

      {/* content section */}
      <div className="px-6 py-4">{children}</div>
      {/* end content section */}

      {/* sidebar section */}
      <div
        className={`flex flex-col w-2/3 md:w-1/2 lg:w-1/4 h-full fixed top-0 right-full rounded-r-3xl transition-transform z-50 duration-1000 bg-[#254212] shadow-xl ${
          isShow ? `translate-x-full` : ``
        }`}
      >
        {/* close button */}
        <div className="ml-auto p-5">
          <button onClick={() => setIsShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        {/* end close button */}
        {/* logo section */}
        <div className="mb-3 w-full flex justify-center">
          <div className="flex items-center space-x-2">
            <Image src={logo} alt="Logo" width={60} height={60} />
            <h1 className="text-3xl font-bold text-[#A5BFCC] tracking-wide">
              KurbanQ Admin
            </h1>
          </div>
        </div>
        {/* end logo section */}
        {/* user section */}
        <div className="w-full mt-10 mb-6 bg-primary text-black py-4 px-6 flex gap-2 items-center">
          <Image
            src={logo}
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full object-cover aspect-square"
          />
          <div className="text-xl font-semibold text-orange-300">
            {userName}
          </div>
        </div>
        {/* end user section */}
        {/* menu section */}
        <div className="w-full p-2 overflow-y-auto text-slate-300 tracking-widest font-semibold">
          <div className="px-5">
            {userList.map((menu, index) => (
              <MenuItem
                icon={menu.icon}
                label={menu.label}
                path={menu.path}
                active={menu.id === id}
                key={`keyMenu${index}`}
              />
            ))}
          </div>
        </div>
        {/* menu
        {/* menu section */}
      </div>
      {/* end sidebar section */}
    </div>
  );
};

export default sideBar;

