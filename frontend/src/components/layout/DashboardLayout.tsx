import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, TrendingUp, Bell, History, Settings, User } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className={cn("flex-1 p-6", className)}>
        {children}
      </main>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-sidebar h-screen sticky top-0 border-r border-border/40">
      <div className="flex h-14 items-center border-b border-border/40 px-4">
        <h2 className="text-lg font-semibold text-primary">MarketSense</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarItem href="/" icon={<LayoutDashboard size={18} />} active={window.location.pathname === "/"}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/strategies" icon={<TrendingUp size={18} />} active={window.location.pathname === "/strategies"}>
            Strategies
          </SidebarItem>
          <SidebarItem href="/alerts" icon={<Bell size={18} />} active={window.location.pathname === "/alerts"}>
            Alerts
          </SidebarItem>
          <SidebarItem href="/history" icon={<History size={18} />} active={window.location.pathname === "/history"}>
            History
          </SidebarItem>
          <SidebarItem href="/settings" icon={<Settings size={18} />} active={window.location.pathname === "/settings"}>
            Settings
          </SidebarItem>
        </ul>
      </nav>
      <div className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary">
            <User size={16} />
          </div>
          <div className="text-sm">
            <p className="font-medium">User</p>
            <p className="text-muted-foreground">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
}

function SidebarItem({ href, children, icon, active }: SidebarItemProps) {
  return (
    <li>
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
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
    </li>
  );
}