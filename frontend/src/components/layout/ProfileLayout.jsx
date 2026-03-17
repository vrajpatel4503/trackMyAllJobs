import { Outlet } from "react-router-dom";
import ProfileSidebar from "../profile/ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col py-2 sm:p-0 lg:flex-row">
      
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Main Content */}
      <main className="flex-1 sm:p-6 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default ProfileLayout;