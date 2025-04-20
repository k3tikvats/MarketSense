
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, TrendingUp, Bell, History, Settings } from "lucide-react";

export function DesktopNav() {
  const { pathname } = useLocation();
  
  return (
    <div className="hidden md:flex gap-1">
      <NavItem 
        href="/" 
        icon={<LayoutDashboard size={16} />}
        active={pathname === "/"}
      >
        Dashboard
      </NavItem>
      <NavItem 
        href="/strategies" 
        icon={<TrendingUp size={16} />}
        active={pathname === "/strategies"}
      >
        Strategies
      </NavItem>
      <NavItem 
        href="/alerts" 
        icon={<Bell size={16} />}
        active={pathname === "/alerts"}
      >
        Alerts
      </NavItem>
      <NavItem 
        href="/history" 
        icon={<History size={16} />}
        active={pathname === "/history"}
      >
        History
      </NavItem>
      <NavItem 
        href="/settings" 
        icon={<Settings size={16} />}
        active={pathname === "/settings"}
      >
        Settings
      </NavItem>
    </div>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
}

function NavItem({ href, children, icon, active }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        "hover:scale-105 active:scale-95",
        active
          ? "bg-accent/50 text-primary shadow-sm"
          : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
      )}
    >
      {icon && (
        <span className={cn(
          "transition-colors duration-200",
          active ? "text-primary" : "text-muted-foreground"
        )}>
          {icon}
        </span>
      )}
      {children}
    </Link>
  );
}