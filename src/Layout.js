import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Search, Users, BarChart3, Settings, Briefcase, Target } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  useSidebar } from
"./components/ui/sidebar";

const navigationItems = [
{
  title: "Dashboard",
  url: createPageUrl("Dashboard"),
  icon: BarChart3
},
{
  title: "New Search",
  url: createPageUrl("JobSearch"),
  icon: Search
},
{
  title: "Candidates",
  url: createPageUrl("Candidates"),
  icon: Users
}];

function NavigationMenu() {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu className="space-y-2">
      {navigationItems.map((item) =>
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`nav-button transition-all duration-200 rounded-xl mb-1 ${
              location.pathname === item.url ? 'active' : ''}`
            }>
            <Link 
              to={item.url} 
              className="flex items-center gap-3 px-4 py-3 text-slate-100 hover:text-blue-300"
              onClick={handleNavClick}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --neu-bg: #ffffff;
          --neu-light: #f8f9fa;
          --neu-dark: #d6d8db;
          --neu-text: #000000;
          --neu-accent: #4299e1;
          --neu-secondary: #6b7280;
        }
        
        body {
          background: var(--neu-bg);
          color: var(--neu-text);
        }
        
        .neu-card {
          background: var(--neu-bg);
          border-radius: 20px;
          box-shadow: 8px 8px 16px var(--neu-dark), -8px -8px 16px var(--neu-light);
          border: none;
        }
        
        .neu-inset {
          background: var(--neu-bg);
          border-radius: 12px;
          box-shadow: inset 4px 4px 8px var(--neu-dark), inset -4px -4px 8px var(--neu-light);
        }
        
        .neu-button {
          background: var(--neu-bg);
          border-radius: 12px;
          box-shadow: 4px 4px 8px var(--neu-dark), -4px -4px 8px var(--neu-light);
          border: none;
          transition: all 0.2s ease;
          color: var(--neu-text);
        }
        
        .neu-button:hover {
          box-shadow: 6px 6px 12px var(--neu-dark), -6px -6px 12px var(--neu-light);
        }
        
        .neu-button:active, .neu-button.active {
          box-shadow: inset 2px 2px 4px var(--neu-dark), inset -2px -2px 4px var(--neu-light);
        }

        .nav-button {
          background: transparent;
          border-radius: 12px;
          border: none;
          transition: all 0.2s ease;
          color: #f1f5f9;
        }
        
        .nav-button:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #93c5fd;
        }
        
        .nav-button.active {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }
        
        .neu-input {
          background: var(--neu-bg);
          border: none;
          border-radius: 12px;
          box-shadow: inset 3px 3px 6px var(--neu-dark), inset -3px -3px 6px var(--neu-light);
          padding: 12px 16px;
          color: var(--neu-text);
        }
        
        .neu-input:focus {
          box-shadow: inset 4px 4px 8px var(--neu-dark), inset -4px -4px 8px var(--neu-light);
          outline: none;
        }
        
        .neu-input::placeholder {
          color: var(--neu-secondary);
        }
      `}</style>
      <div className="min-h-screen flex w-full" style={{ background: 'var(--neu-bg)' }}>
        <Sidebar className="border-none neu-card">
          <SidebarHeader className="bg-slate-950 p-6 flex flex-col gap-2 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 neu-card flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-slate-200 text-lg font-bold">TalentScout</h2>
                  <p className="text-slate-300 text-xs">AI-Powered Recruitment</p>
                </div>
              </div>
              {/* Mobile close button */}
              <div className="md:hidden">
                <SidebarTrigger className="text-slate-200 hover:text-white" />
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="bg-slate-950 p-4 flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden">
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-50 px-2 py-2 text-xs font-semibold uppercase flex h-8 shrink-0 items-center rounded-md outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 tracking-wider">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <NavigationMenu />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="bg-slate-950 p-6 flex flex-col gap-2 border-none">
            <div className="neu-inset p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 neu-card rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-black text-sm truncate">HR Professional</p>
                  <p className="text-xs text-gray-600 truncate">Talent Acquisition</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="neu-card border-none px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="neu-button p-2 rounded-lg" />
              <h1 className="text-xl font-bold text-black">TalentScout</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>);

}