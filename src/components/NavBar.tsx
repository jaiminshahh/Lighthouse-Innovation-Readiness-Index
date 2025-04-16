
import React from "react";
import { Home, BarChart3, BrainCircuit } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { path: "/assessment", label: "Assessment", icon: <BrainCircuit className="h-5 w-5" /> },
    { path: "/results", label: "Results", icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-miq-primary" />
            <span className="font-bold text-xl text-miq-primary">MIQ Compass</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-2 transition-colors hover:text-miq-primary",
                location.pathname === item.path
                  ? "text-miq-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
