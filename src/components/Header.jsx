import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/AfCHPRLogo AULogoSeal Mockup_English-Color.png";
import {
  RiAdminLine,
  RiOrganizationChart,
  RiLogoutCircleLine,
  RiSettingsLine,
} from "react-icons/ri";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrOrganization } from "react-icons/gr";
import { FcOrgUnit } from "react-icons/fc";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import { AccessibilityIcon } from "lucide-react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleNavMenu = () => setIsNavOpen(!isNavOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const UserDropdown = () => (
    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm text-gray-900 font-medium truncate">
          john.doe@africancourt.org
        </p>
        <p className="text-xs text-gray-500">Document Management Admin</p>
      </div>
      <ul className="py-1">
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <RiSettingsLine className="mr-3" /> Settings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <AiOutlineUser className="mr-3" /> Profile
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <RiLogoutCircleLine className="mr-3" /> Logout
          </a>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="sticky top-0 z-50 h-[5.5rem] bg-white shadow-md">
      <header className="border-b border-gray-200">
        <nav
          className="mx-auto flex max-w-screen-3xl px-6 items-center justify-between gap-x-6 py-3 sm:px-4 lg:py-2"
          aria-label="Global"
        >
          <div className="flex">
            {/* Logo Section */}
            <div className="flex items-center w-auto">
              <Link
                to="/"
                className="flex-none flex-shrink-0 block p-1 rounded-lg"
                title="Home page"
              >
                <img
                  className="h-12 md:h-[64px] w-auto"
                  src={logo}
                  alt="Document Management System Logo"
                />
              </Link>
            </div>
            <div className="text-gray-500 ml-4 mt-1 hidden md:block">
              <p className="text-xs">
                Phone: +255-27 2970430 <br />
                Mwalimu Julius Nyerere Conservation Centre, Dodoma Road <br />
                P.O. Box 6274 Arusha, TANZANIA <br />
                E-mail:{" "}
                <a
                  href="mailto:registrar@african-court.org"
                  className="text-blue-600 hover:underline"
                >
                  registrar@african-court.org
                </a>
              </p>
            </div>
          </div>

          {/* Title and Motto (hidden on smaller screens) */}
          <div className="hidden md:block text-center pr-32">
            <h1 className="text-3xl text-customMaroon font-semibold">
              African Court on Human and People's Rights
            </h1>
            <p className="text-base mt-2 text-customMaroon">
              Mahakama ya Afrika &nbsp;&nbsp;&bull;&nbsp;&nbsp; Cour africaine
              &nbsp;&nbsp;&bull;&nbsp;&nbsp; المحكمة الإفريقية
              &nbsp;&nbsp;&bull;&nbsp;&nbsp; Tribunal Africano
              &nbsp;&nbsp;&bull;&nbsp;&nbsp; Corte Africana
            </p>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Accessibility */}
            <button
              className="text-gray-600 hover:text-customMaroon transition-colors"
              title="Accessibility Options"
            >
              <AccessibilityIcon size={24} />
            </button>

            {/* Notifications */}
            <button
              className="text-gray-600 hover:text-customMaroon transition-colors relative"
              title="Notifications"
            >
              <IoNotificationsOutline size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
              >
                <RiAdminLine className="mr-2" size={20} />
                <span className="hidden md:block mr-2 text-sm font-semibold text-gray-500">
                  John Doe Sample
                </span>
                <IoIosArrowDown />
              </button>
              {isUserDropdownOpen && <UserDropdown />}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleNavMenu}
              className="text-customMaroon text-3xl lg:hidden"
              title="Toggle Navigation"
            >
              {isNavOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
