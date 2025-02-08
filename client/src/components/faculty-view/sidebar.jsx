import { BellRing, BookOpen, Building, Calendar, ChartNoAxesCombined, Clock, DeleteIcon, Eye, LucideDelete, Plus, RecycleIcon, Trash2, User, UserPlus, Users } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const facultySidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/faculty/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "profile",
    label: "Profile",
    path: "/faculty/profile",
    icon: <User />,
  },
  {
    id: "all-stud",
    label: "All Students",
    path: "/faculty/stud-info",
    icon: <BellRing />,
  },
  {
    id: "attendance",
    label: "Attendance",
    path: "/faculty/attendance",
    icon: <BellRing />,
  },

  {
    id: "notes",
    label: "Upload Notes",
    path: "/faculty/upload-notes",
    icon: <UserPlus />,
  },

  {
    id: "notesList",
    label: " Notes List",
    path: "/faculty/notes-list",
    icon: <Building />,
  },

  {
    id: "timetable",
    label: "Time Table",
    path: "/faculty/timetable",
    icon: <Clock />,
  },

  {
    id: "create-notice",
    label: "Create Notice",
    path: "/faculty/create-notice",
    icon: <BookOpen />,
  },
  {
    id: "show-notices",
    label: "Show Notices ",
    path: "/faculty/show-notices",
    icon: <Eye />,
  },

  {
    id: "create-test",
    label: "Create Test ",
    path: "/faculty/create-test",
    icon: <Plus />,
  },
  {
    id: "test-result",
    label: "Test Result ",
    path: "/faculty/test-result",
    icon: <Eye />,
  },
  {
    id: "event ",
    label: "Event ",
    path: "/faculty/event",
    icon: <Calendar />,
  },
  {
    id: "Fees",
    label: "Fees Structure ",
    path: "/faculty/fees",
    icon: <Eye />,
  },

];

function MenuItem({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2 ">
      {facultySidebarMenuItems.map((menuitem) => (
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

const FacultySideBar = ({ open, setOpen }) => {
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
                <h1 className="text-2xl font-extrabold">Faculty Panel</h1>
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
          <h1 className="text-2xl font-extrabold">Faculty Panel</h1>
        </div>
         {MenuItem(setOpen={setOpen})} 
      </aside>
    </Fragment>
  );
};

export default FacultySideBar;
