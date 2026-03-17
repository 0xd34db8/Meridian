import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col">
      {/* Now the page height is fixed, so scrolling must happen inside children, not the body */}
      <Navbar />
      {/* reserve navbar height */}
      <main className="flex-1 md:pt-[72px]">
        <Outlet />
      </main>
    </div>
  );
}
