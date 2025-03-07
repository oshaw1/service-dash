'use client';
import { useState } from "react";
import { Home, Settings, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function Sidebar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <aside 
      className={`bg-card border-r border-animated flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-full md:w-40"
      }`}
    >
      <div className="flex flex-col items-center justify-center p-2 pt-4">
        {collapsed ? <img src="/images/logo.svg" alt="Logo" className="h-10 w-10" /> : <img src="/images/logo.svg" alt="Logo" className="h-14 w-14" />}
        {!collapsed && <h1 className="mt-2 text-lg font-bold text-center p-2">Service-dash</h1>}
      </div>
      
      <nav className="flex flex-col flex-grow px-1 space-y-2">
        <div>
          <Button
            variant="nav"
            className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-center"}`}
            onClick={() => router.push("/")}
          >
            <Home className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
            {!collapsed && "Dashboard"}
          </Button>
        </div>
        <div className="mt-auto flex flex-col space-y-2">
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-neutral-700 active:bg-blue-600"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        <div className="mt-auto">
          <Button
            variant="nav"
            className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-center"}`}
            onClick={() => router.push("/settings")}
          >
            <Settings className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
            {!collapsed && "Settings"}
          </Button>
        </div>
        </div>
      </nav>
    </aside>
  );
}