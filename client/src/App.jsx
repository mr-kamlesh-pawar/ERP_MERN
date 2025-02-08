import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
//import { Skeleton } from "@/components/ui/skeleton";
import AdminProfile from "./pages/admin-view/profile";
import AdminNotice from "./pages/admin-view/notice";
import ShowAdmins from "./pages/admin-view/showAdmins";
import AdminDepartment from "./pages/admin-view/adminDepartment";
import AdminOurFaculty from "./pages/admin-view/adminOurFaculty";
import AdminStudents from "./pages/admin-view/adminStudents";
import AdminSubjects from "./pages/admin-view/adminSubjects";
import AdminEvents from "./pages/admin-view/adminEvents";
import FacultyDashboard from "./pages/faculty-view/dashboard";
import FacultyLayout from "./components/faculty-view/layout";
import StudentLayout from "./components/student-view/layout";
import StudentDashboard from "./pages/student-view/dashboard";
import LoadingScreen from "./pages/loading";
import MarkAttendance from "./pages/faculty-view/attendance";
//import GetAttendance from "./pages/faculty-view/uploadNotes";
import UploadNotes from "./pages/faculty-view/uploadNotes";
import FacultyProfile from "./pages/faculty-view/profile";
import NotesList from "./pages/faculty-view/NotesList";


function App() {
  
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") {
    navigate("/auth/login");
  }

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <LoadingScreen/>;

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/*  Common components */}

      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="notice" element={<AdminNotice />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="show-admin" element={<ShowAdmins />} />
          <Route path="department" element={<AdminDepartment />} />
          <Route path="our-faculty" element={<AdminOurFaculty />} />
          <Route path="our-stud" element={<AdminStudents />} />
          <Route path="subjects" element={<AdminSubjects />} />
          <Route path="events" element={<AdminEvents />} />
        </Route>

        {/* Faculty Routes */}
        <Route
          path="/faculty"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <FacultyLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="attendance" element={<MarkAttendance />} />
          <Route path="upload-notes" element={<UploadNotes/>} />
          <Route path="profile" element={<FacultyProfile/>} />
          <Route path="notes-list" element={<NotesList/>} />
        </Route>

        {/* Students Routes */}
        <Route
          path="/student"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <StudentLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />
         
        </Route>
    
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
