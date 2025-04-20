
import { MobileNav } from "../dashboard/MobileNav";
import { DesktopNav } from "./DesktopNav";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function DashboardNavbar() {
  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <Link 
          to="/" 
          className="mr-4 transition-transform hover:scale-105 active:scale-95"
        >
          <Logo />
        </Link>
        
        <DesktopNav />
        
        <div className="ml-auto flex items-center space-x-4">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
