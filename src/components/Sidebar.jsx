import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsGrid1X2 } from "react-icons/bs";
import { TbCards, TbUsers } from "react-icons/tb";
import { motion } from "framer-motion";
import { useShop } from "../context/ShopContext";

const navItems = [
  { to: "/admin-dashboard", icon: BsGrid1X2, label: "Dashboard" },
  { to: "/admin-task", icon: TbCards, label: "tasks", notification: true },
  { to: "/admin-team", icon: TbUsers, label: "team" },
];

const Sidebar = () => {
  const { jobs } = useShop();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("ather-husain");
  };

  const SidebarLink = ({ to, icon: Icon, label, notification, onClick }) => {
    const isActive = pathname === to;

    return (
      <NavLink
        to={to}
        onClick={(e) => {
          // ✅ FIX: Agar link pehle se active hai toh route change prevent karo
          // Isse animation baar-baar trigger nahi hogi
          if (isActive) {
            e.preventDefault();
            return;
          }
          if (onClick) onClick();
        }}
        className="relative py-3 px-3 max-w-[90%] text-gray-700 z-10 block my-1"
      >
        {/* ✅ FIX: Sirf isActive hone par motion.div render hoga */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active-pill"
            className="absolute inset-0 bg-[#336F47] rounded-xl"
            initial={false}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}

        <div
          className={`relative z-20 flex items-center justify-between w-full transition-colors duration-200
          ${isActive ? "text-white font-bold" : "hover:text-black"}`}
        >
          <div className="flex items-center gap-2">
            <Icon size={20} />
            <p className="text-[16px]">{label}</p>
          </div>

          {notification && (
            <span
              className={`text-sm px-2 py-0.5 rounded-[5px] transition-all
              ${isActive ? "bg-white text-[#336F47]" : "bg-[#336F47] text-white"}`}
            >
              {jobs.length}
            </span>
          )}
        </div>
      </NavLink>
    );
  };

  return (
    <div className="sticky top-5 h-[95vh] hidden lg:flex flex-col m-5 min-w-[17%] rounded-3xl bg-gray-100 tracking-tighter capitalize px-3">
      <img className="px-5 my-10 w-[150px]" src="/ke.png" alt="logo" />

      <div className="mx-5 flex flex-col pt-6">
        <p className="text-[14px] uppercase text-gray-400 font-bold mb-4">menu</p>

        <div className="flex flex-col">
          {navItems.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}

          <div className="mt-20 flex flex-col">
            <p className="text-[14px] uppercase text-gray-400 font-bold mb-4">general</p>

            <SidebarLink
              to="/login"
              icon={TbUsers}
              label="logout"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;