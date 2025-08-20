"use client";
import "flowbite";
import React, { useState, useEffect } from "react";
import {
  Button,
  DrawerItems,
  Navbar,
  NavbarCollapse,
  Drawer,
  useThemeMode,
} from "flowbite-react";
import { Icon } from "@iconify/react";
import Profile from "./Profile";
import MobileSidebar from "../sidebar/MobileSidebar";
import Link from "next/link";
import Notifications from "./Notifications";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Flowbite theme hook
  const { mode, toggleMode } = useThemeMode();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMobileMenu = () => {
    if (mobileMenu === "active") {
      setMobileMenu("");
    } else {
      setMobileMenu("active");
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-2 ${isSticky
          ? "bg-white dark:bg-dark shadow-md fixed w-full"
          : "bg-transparent"
          }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:ps-6 max-w-full! sm:pe-10`}
        >
          {/* Mobile Toggle Icon */}
          <span
            onClick={() => setIsOpen(true)}
            className="px-15 hover:text-primary dark:hover:text-primary text-link dark:text-darklink relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent rounded-full xl:hidden flex justify-center items-center cursor-pointer"
          >
            <Icon icon="tabler:menu-2" height={20} />
          </span>

          <div className="flex w-full justify-end items-end">
            <div className="flex gap-0 items-center ">
              <div className="relative lg:block hidden group w-fit shadow-grid-shadow bg-[radial-gradient(100%_707.08%_at_0%_0%,#15CEBD_0%,#548AFE_33.82%,#E02FD6_72.12%,#FDB54E_100%)] p-0.5 rounded-full">
                <Link href={"https://tailwind-admin.com/#pricing"} className="flex items-center gap-2.5 px-3 py-1.5 bg-white dark:bg-dark-header rounded-full transition-all dark:hover:bg-[radial-gradient(100%_707.08%_at_0%_0%,#15CEBD36_0%,#548AFE36_33.82%,#E02FD636_72.12%,#FDB54E36_100%)] group hover:bg-[radial-gradient(100%_707.08%_at_0%_0%,#15CEBD36_0%,#548AFE36_33.82%,#E02FD636_72.12%,#FDB54E36_100%)]">
                  <p className="text-forest-black dark:text-white text-base font-semibold">Check Pro Version</p>
                </Link>
              </div>

              {/* ✅ Dark/Light Toggle */}
              <div
                className=" hover:text-primary px-15 group dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink relative"
                onClick={toggleMode}
              >
                <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                  {mode === "light" ? (
                    <Icon icon="tabler:moon" width="20" />
                  ) : (
                    <Icon
                      icon="solar:sun-bold-duotone"
                      width="20"
                      className="group-hover:text-primary"
                    />
                  )}
                </span>
              </div>

              <NavbarCollapse className="xl:block ">
                <div className="flex gap-0 items-center relative">
                  {/* Chat */}
                  <Notifications />
                </div>
              </NavbarCollapse>

              {/* Profile Dropdown */}
              <Profile />
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} className="w-fit">
        <DrawerItems>
          <MobileSidebar />
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default Header;
