
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LayoutDashboard, TrendingUp, Bell, History, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../layout/Logo";

export function MobileNav() {
  const { pathname } = useLocation();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav>
          <ul className="space-y-3">
            <NavItem 
              href="/" 
              icon={<LayoutDashboard size={18} />}
              active={pathname === "/"}
            >
              Dashboard
            </NavItem>
            <NavItem 
              href="/strategies" 
              icon={<TrendingUp size={18} />}
              active={pathname === "/strategies"}
            >
              Strategies
            </NavItem>
            <NavItem 
              href="/alerts" 
              icon={<Bell size={18} />}
              active={pathname === "/alerts"}
            >
              Alerts
            </NavItem>
            <NavItem 
              href="/history" 
              icon={<History size={18} />}
              active={pathname === "/history"}
            >
              History
            </NavItem>
            <NavItem 
              href="/settings" 
              icon={<Settings size={18} />}
              active={pathname === "/settings"}
            >
              Settings
            </NavItem>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

interface NavItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
}

function NavItem({ href, children, icon, active }: NavItemProps) {
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