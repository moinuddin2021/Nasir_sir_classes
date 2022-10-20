import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { FaWpforms } from "react-icons/fa";
import { BsReceipt } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { GiTeacher } from "react-icons/gi";
import { IoMdInformationCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-full bg-white sticky left-0 top-0">
      <div className="sidebar h-screen w-20 xl:w-60">
        <div className="sidebar-top flex justify-center mr-8 pt-1 pb-6 ">
          <img src="/images/logo.png" alt="" className="w-36 cursor-pointer hidden xl:block " id="logo"/>
        </div>
        <div className="navigation mt-4">
          <ul className="text-center">
            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="/">
              <li className="inline-flex pl-11 items-center py-2 w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <RiDashboardFill className="w-5 h-5 mr-2" />
                <h1 className="text-base hidden xl:block  ">Dashboard</h1>
              </li>
            </NavLink>
            </div>

            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="myclass">
              <li className="inline-flex pl-11 items-center py-2 w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <FaUsers className="w-5 h-5 mr-2" />
                <h1 className="text-base hidden  xl:block  ">My Class</h1>
              </li>
            </NavLink>
            </div>

            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="fee">
              <li className="inline-flex pl-11 items-center py-2 w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <BiRupee className="w-5 h-5 mr-2" />
                <h1 className="text-base hidden  xl:block  ">Fees</h1>
              </li>
            </NavLink>
            </div>

            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="receipt">
              <li className="inline-flex pl-11 items-center py-2 w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <BsReceipt className="w-5 h-5 mr-2" />
                <h1 className="text-base hidden  xl:block  "> Reciept</h1>
              </li>
            </NavLink>
            </div>

            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="faculty">
              <li className="inline-flex pl-11 items-center py-2 w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <GiTeacher className="w-5 h-5 mr-2"/>
                <h1 className="text-base hidden  xl:block  ">Staff</h1>
              </li>
            </NavLink>
            </div>            

            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="report">
              <li className="inline-flex pl-11 items-center py-2 w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <FaWpforms className="w-5 h-5 mr-2"/>
                <h1 className="text-base hidden  xl:block  "> Report</h1>
              </li>
            </NavLink>
            </div>

            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="studentregister">
              <li className="inline-flex pl-11 items-center py-2 w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <IoMdPersonAdd className="w-5 h-5 mr-2" />
                <h1 className="text-base hidden  xl:block  ">Student Reg</h1>
              </li>
            </NavLink>
            </div>

            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="help">
              <li className="inline-flex pl-11 items-center py-2 w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <IoMdInformationCircle className="w-5 h-5 mr-2" />
                <h1 className="text-base hidden  xl:block  "> Help</h1>
              </li>
            </NavLink>
            </div>

          </ul>
        </div>
      </div>
    </div>
  );
}
