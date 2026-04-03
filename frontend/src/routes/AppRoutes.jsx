import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// ================== Public Pages ==================
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../features/auth/Login.jsx";
import Register from "../features/auth/Register.jsx";
import MainLayout from "../components/layout/MainLayout.jsx";
import ProtectedRoutes from "./ProtectedRoute.jsx";
import Profile from "../pages/profile/Profile.jsx";
import ProfileLayout from "../components/layout/ProfileLayout.jsx";
import EditProfile from "../pages/profile/EditProfile.jsx";
import AccountSetting from "../pages/profile/AccountSetting.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AddNewJobForm from "../components/job/AddNewJobForm.jsx";
import ViewJobDetails from "../components/job/ViewJobDetails.jsx";
import EditJobForm from "../components/job/EditJobForm.jsx";
import HomeRedirect from "./HomeRedirect.jsx";
import AllJobsPage from "../pages/job/AllJobsPage.jsx";
import Analytics from "../pages/Analytics.jsx";

const AppRoutes = () => {
  // --------- react router dom -----------
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ----- Public Routes ----- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ----- Private Routes ----- */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoutes />}>
            {/* ----------- Profile Routes ------------ */}
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="edit" element={<EditProfile />} />
              <Route path="setting" element={<AccountSetting />} />
            </Route>
            {/* -------------- Jobs Routes --------------- */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add/job" element={<AddNewJobForm />} />

            {/* --- View job Details --- */}
            <Route
              path="/dashboard/view/job/:jobId"
              element={<ViewJobDetails />}
            />

            {/* --- Edit Job Form --- */}
            <Route
              path="/dashboard/edit/job/:jobId"
              element={<EditJobForm />}
            />

            {/* --- All Job Page --- */}
            <Route path="/dashboard/all/jobs" element={<AllJobsPage />} />


            {/* --- Analytics Page --- */}
            <Route path="/dashboard/analytics" element={<Analytics />} />
          </Route>
        </Route>
      </>,
    ),
  );

  //   ------------------------------------------------------------------------

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
