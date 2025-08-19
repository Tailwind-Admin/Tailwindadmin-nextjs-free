"use client";
import "flowbite";
import React, { useState, useEffect, useContext } from "react";
import { Button, DarkThemeToggle, DrawerItems, Navbar, NavbarCollapse } from "flowbite-react";
import { Icon } from "@iconify/react";
import Profile from "./Profile";
import { Drawer } from "flowbite-react";
import MobileSidebar from "../sidebar/MobileSidebar";
import Link from "next/link";
import Notifications from "./Notifications";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

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

  const [mobileMenu, setMobileMenu] = useState("");

  const handleMobileMenu = () => {
    if (mobileMenu === "active") {
      setMobileMenu("");
    } else {
      setMobileMenu("active");
    }
  };

  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
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
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:ps-6 max-w-full! sm:pe-10 $`}
        >
          {/* Mobile Toggle Icon */}
          <span
            onClick={() => setIsOpen(true)}
            className="px-15 hover:text-primary dark:hover:text-primary text-link dark:text-darklink relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent rounded-full xl:hidden flex justify-center items-center cursor-pointer"
          >
            <Icon icon="tabler:menu-2" height={20} />
          </span>
          {/* Toggle Icon   */}
          <NavbarCollapse className="xl:block ">
            <div className="flex gap-0 items-center relative">
              {/* Chat */}
              <Notifications />
            </div>
          </NavbarCollapse>


          <div className="block">
            <div className="flex gap-0 items-center ">
              <div className="relative group w-fit shadow-grid-shadow bg-[radial-gradient(100%_707.08%_at_0%_0%,#15CEBD_0%,#548AFE_33.82%,#E02FD6_72.12%,#FDB54E_100%)] p-[2px] rounded-full">
                <Button
                  color={"primary"}
                  as={Link}
                  target="_blank"
                  size={"md"}
                  href="https://tailwind-admin.com/#pricing"
                  className="w-full rounded-full py-0 bg-white group-hover:text-white text-link text-base font-semibold group-hover:bg-[radial-gradient(100%_707.08%_at_0%_0%,#15CEBD_0%,#548AFE_33.82%,#E02FD6_72.12%,#FDB54E_100%)]"
                >
                  Check Pro Version
                </Button>
              </div>
              {/* Profile Dropdown */}
              <Profile />
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={handleClose} className="w-fit">
        <DrawerItems>
          <MobileSidebar />
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default Header;