import { BellRing, BookOpen, Building, ChartNoAxesCombined, DeleteIcon, Eye, LucideDelete, Plus, RecycleIcon, Trash2, User, UserPlus, Users } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "profile",
    label: "Profile",
    path: "/admin/profile",
    icon: <User />,
  },
  {
    id: "notice",
    label: "Notice",
    path: "/admin/notice",
    icon: <BellRing />,
  },

  {
    id: "admin",
    label: "Admin",
    path: "/admin/show-admin",
    icon: <UserPlus />,
  },

  {
    id: "department",
    label: " Department",
    path: "/admin/department",
    icon: <Building />,
  },

  {
    id: "our-fac",
    label: "Our faculty",
    path: "/admin/our-faculty",
    icon: <Users />,
  },

  {
    id: "students",
    label: "Our Students",
    path: "/admin/students",
    icon: <Eye />,
  },
  {
    id: "subjects",
    label: "Subjects ",
    path: "/admin/subjects",
    icon: <BookOpen />,
  },
  {
    id: "events",
    label: "New Events ",
    path: "/admin/events",
    icon: <Plus />,
  },

];

function MenuItem({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2 ">
      {adminSidebarMenuItems.map((menuitem) => (
        <div
          key={menuitem.id}
          className="flex text-xl  cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => {
            navigate(menuitem.path);
            setOpen? setOpen(false) : null
          }}
        >
          {menuitem.icon} <span>{menuitem.label}</span>
        </div>
      ))}
    </nav>
  );
}

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full ">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-9 mb-4">
                {" "}
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItem setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex ">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
         {MenuItem(setOpen={setOpen})} 
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
