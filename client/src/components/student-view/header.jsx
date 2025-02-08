import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const StudentHeader = ({ setOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b ">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-between ">
        <div className=" flex justify-center items-center space-x-3 ml-5">
          <img
            className="w-8 h-8 rounded-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7sWBeRmD_VE8NnpSuGNk1k7_cljm7fjuqdg&s"
            alt=""
          />
          <h1 className="font-semibold lg:text-xl   md:text-md sm:text-sm">
            Student
          </h1>
        </div>
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          Logout
          <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default StudentHeader;
